import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EstadoProcesoRepository } from '../../status-proceso/estado-proceso.repository';
import { CrearEventoEjecucionDto } from '../dtos/crear-evento-ejecucion.dto';
import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import { ejecucionProcesoMapper } from '../mappers/ejecucion-proceso.mapper';
import { EjecucionProcesoEntity } from '../ejecucion-proceso.entity';

@Injectable()
export class CrearEventoEjecucionUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly estadoProcesoRepository: EstadoProcesoRepository,
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

      const actualizada = await this.ejecucionProcesoRepository.actualizar(ejecucionProcesoId, {
        statusProcesoId: estado.id,
        fechaHoraFin: ahora,
        duracionSegundos,
      });

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
