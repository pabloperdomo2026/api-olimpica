import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EstadoProcesoRepository } from '../../status-proceso/estado-proceso.repository';
import { ProcesoService } from '../../proceso/proceso.service';
import { CrearEjecucionProcesoDto } from '../dtos/crear-ejecucion-proceso.dto';
import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import { ejecucionProcesoMapper } from '../mappers/ejecucion-proceso.mapper';
import { CrearFrameworkOrquestacionUseCase } from 'src/orquestacion/casos-de-uso';
import { ParametrosGlobalesRepository } from 'src/parametros-globales/parametros-globales.repository';

@Injectable()
export class CrearEjecucionUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly estadoProcesoRepository: EstadoProcesoRepository,
    private readonly parametrosGlobales: ParametrosGlobalesRepository,
    private readonly procesoService: ProcesoService,
    private readonly crearFrameworkOrquestacionUseCase: CrearFrameworkOrquestacionUseCase
  ) {}

  async execute(dto: CrearEjecucionProcesoDto): Promise<EjecucionProcesoResponse> {
    try {
      const proceso = await this.procesoService.obtenerPorId(dto.procesoId);

      const estados = await this.estadoProcesoRepository.listarTodos();
      const estadoInicial = estados.find((e) => e.esInicial);

      if (!estadoInicial) {
        throw new NotFoundException(
          'No se encontro un estado inicial configurado en smr_status_proceso',
        );
      }

      const parametrosJson = proceso.parametrosJson;
      const parametrosResueltos = await this.resolverParametrosJson(
        parametrosJson,
        proceso.organizacionId,
      );

      const todosLosParametros = proceso.organizacionId
        ? await this.parametrosGlobales.listarPorOrganizacion(proceso.organizacionId)
        : [];

      const parametrosGlobalesArray = todosLosParametros.map((p) => ({
        ITEM_GRUPO: p.itemGrupo,
        ITEM_ATRIBUTO: p.itemAtributo,
        VALOR_RETORNAR: p.valorRetornar,
      }));

      const ahora = new Date();

      const ejecucionCreada = await this.ejecucionProcesoRepository.crear({
        procesoId: dto.procesoId,
        organizacionId: proceso.organizacionId,
        statusProcesoId: estadoInicial.id,
        fechaEjecucion: ahora,
        fechaHoraInicio: ahora,
        tipoEjecucion: dto.tipoEjecucion ?? 'MANUAL',
        usuarioSolicita: dto.usuarioSolicita,
        usuarioCreacion: dto.usuarioSolicita ?? 'sistema',
      });

      parametrosResueltos['p_parametros_globales'] = parametrosGlobalesArray;
      parametrosResueltos['p_organization_id'] = proceso.organizacionId;
      parametrosResueltos['p_entidad'] = 'ventas';
      parametrosResueltos['p_fecha_inicio'] = this.formatearFecha(new Date()),
      parametrosResueltos['p_fecha_fin'] = this.formatearFecha(new Date('2026-02-28T23:59:59')),
      parametrosResueltos['id_local'] = 1
      parametrosResueltos['p_proceso_ejecucion_id'] = ejecucionCreada.id

      console.log('parametros resueltos:', parametrosResueltos);

      const response = await this.crearFrameworkOrquestacionUseCase.execute({
        idWorkflowCloud: proceso.idWorkflowCloud,
        body: parametrosResueltos
      })

      console.log('response:', response)
      

      return ejecucionProcesoMapper(ejecucionCreada);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al crear la ejecucion',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }

  private formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    const segundo = String(fecha.getSeconds()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  }

  private async resolverParametrosJson(
    parametrosJson: string | undefined | null,
    organizacionId: string | undefined,
  ): Promise<Record<string, unknown>> {
    if (!parametrosJson || !organizacionId) return {};

    // Los placeholders ##...## pueden estar sin comillas en el JSON almacenado.
    // Los envolvemos en comillas para que JSON.parse no falle.
    const jsonSaneado = parametrosJson.replace(
      /(?<!")(##[^#]+##)(?!")/g,
      '"$1"',
    );

    let objeto: Record<string, unknown>;
    try {
      objeto = JSON.parse(jsonSaneado);
    } catch {
      console.warn('parametrosJson no es un JSON valido:', parametrosJson);
      return {};
    }

    const resolverValor = async (valor: string): Promise<string> => {
      const coincidencias = [...valor.matchAll(/##([^-#]+)-([^#]+)##/g)];
      let resultado = valor;

      for (const match of coincidencias) {
        const [placeholder, itemGrupo, itemAtributo] = match;
        const parametro = await this.parametrosGlobales.obtenerPorClave(
          organizacionId,
          itemGrupo,
          itemAtributo,
        );

        if (parametro) {
          resultado = resultado.replace(placeholder, parametro.valorRetornar);
        } else {
          console.warn(
            `Parametro global no encontrado: grupo="${itemGrupo}" atributo="${itemAtributo}"`,
          );
        }
      }

      return resultado;
    };

    const objetoResuelto: Record<string, unknown> = {};

    for (const [clave, valor] of Object.entries(objeto)) {
      objetoResuelto[clave] =
        typeof valor === 'string' ? await resolverValor(valor) : valor;
    }

    return objetoResuelto;
  }
}
