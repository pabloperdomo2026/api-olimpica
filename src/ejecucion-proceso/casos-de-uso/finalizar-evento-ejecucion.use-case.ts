import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EstadoProcesoRepository } from 'src/status-proceso/estado-proceso.repository';

@Injectable()
export class FinalizarEventoEjecucionUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly estadoProcesoRepository: EstadoProcesoRepository,
  ) {}

  async execute(dto: any): Promise<any> {
    try {
      const { datos } = dto;
      const ejecucionProcesoId = datos.p_ejecucion_proceso_id;
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

      const actualizada = await this.ejecucionProcesoRepository.actualizar(ejecucionProcesoId, {
        statusProcesoId: estado.id,
        fechaHoraFin: ahora,
        duracionSegundos,
      });

      console.log('[FinalizarEventoEjecucion] payload recibido:', JSON.stringify(dto, null, 2));
      return { status: 'Success' };
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al finalizar el evento de ejecucion',
          errorMessage: error.message,
        },
        error.status || 500,
      );
    }
  }
}
