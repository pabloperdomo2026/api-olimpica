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
      console.log('parametros resueltos:', parametrosResueltos);

      const response = await this.crearFrameworkOrquestacionUseCase.execute({
        idWorkflowCloud: proceso.idWorkflowCloud
      })

      console.log('response:', response)
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
