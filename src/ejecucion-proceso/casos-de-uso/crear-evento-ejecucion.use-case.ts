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

  async execute(dto: any): Promise<any> {
    try {
      console.log('Evento:', dto);

      return {
        status: 'Success'
      }
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al registrar el evento de ejecucion',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
