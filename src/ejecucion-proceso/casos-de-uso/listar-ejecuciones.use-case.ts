import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import {
  listarEjecucionesMapper,
  ejecucionProcesoMapper,
} from '../mappers/ejecucion-proceso.mapper';

@Injectable()
export class ListarEjecucionesUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
  ) {}

  async execute(procesoId?: string): Promise<EjecucionProcesoResponse[]> {
    try {
      const ejecuciones = procesoId
        ? await this.ejecucionProcesoRepository.listarPorProceso(procesoId)
        : await this.ejecucionProcesoRepository.listarTodos();

      return listarEjecucionesMapper(ejecuciones);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener las ejecuciones',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }

  async executeById(id: string): Promise<EjecucionProcesoResponse> {
    try {
      const ejecucion = await this.ejecucionProcesoRepository.obtenerPorId(id);

      if (!ejecucion) {
        throw new NotFoundException(`Ejecucion con id ${id} no encontrada`);
      }

      return ejecucionProcesoMapper(ejecucion);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener la ejecucion',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
