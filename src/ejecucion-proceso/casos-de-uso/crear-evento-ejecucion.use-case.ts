import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EstadoProcesoRepository } from '../../status-proceso/estado-proceso.repository';
import { ConfiguracionAlertaRepository } from '../../configuracion-alerta/configuracion-alerta.repository';
import { CrearEventoEjecucionDto } from '../dtos/crear-evento-ejecucion.dto';
import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import { ejecucionProcesoMapper } from '../mappers/ejecucion-proceso.mapper';
import { EjecucionProcesoEntity } from '../ejecucion-proceso.entity';

@Injectable()
export class CrearEventoEjecucionUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly estadoProcesoRepository: EstadoProcesoRepository,
    private readonly configuracionAlertaRepository: ConfiguracionAlertaRepository,
  ) {}

  async execute(dto: any): Promise<EjecucionProcesoResponse> {
    try {
      const { datos } = dto;
      const ejecucionProcesoId = datos.p_proceso_ejecucion_id;
      const estadoCodigo = datos.p_estado;

      const ejecucion = await this.ejecucionProcesoRepository.obtenerPorId(ejecucionProcesoId);
      if (!ejecucion) {
        throw new NotFoundException(`Ejecucion con ID ${ejecucionProcesoId} no encontrada`);
      }

      const estado = await this.estadoProcesoRepository.obtenerPorCodigo(estadoCodigo);
      if (!estado) {
        throw new NotFoundException(`Estado de proceso con codigo "${estadoCodigo}" no encontrado`);
      }

      const ahora = new Date();
      const duracionSegundos = Math.floor(
        (ahora.getTime() - ejecucion.fechaHoraInicio.getTime()) / 1000,
      );

      let registros: any = {};

      if (datos?.p_total_registros) {
        registros.numeroRegistrosProcesados = datos.p_total_registros;
      }

      if (datos?.p_registros_fallidos) {
        registros.numeroRegistrosFallidos = datos.p_registros_fallidos;
      }

      if (datos?.p_registros_exitosos) {
        registros.numeroRegistrosExitosos = datos.p_registros_exitosos;
      }

      const actualizada = await this.ejecucionProcesoRepository.actualizar(ejecucionProcesoId, {
        statusProcesoId: estado.id,
        fechaHoraFin: ahora,
        duracionSegundos,
        ...registros,
      });

      if (estadoCodigo === 'EXITOSO') {
        const alertas = await this.configuracionAlertaRepository.listarPorProcesoId(ejecucion.procesoId);
        const alertasaEnviar: any = alertas.find((alerta) => alerta.condicionDisparo === "status='EXITOSO'");
        const destinatarios = alertasaEnviar?.recipiente?.emailsDestino;
        console.log('[CrearEventoEjecucion] configuraciones de alerta del proceso:', destinatarios);
      }

      return ejecucionProcesoMapper(actualizada);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al registrar el evento de ejecucion',
          errorMessage: error.response ?? error.message,
        },
        error.status || 500,
      );
    }
  }
}
