import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { EstadoProcesoResponse } from '../interfaces/estado-proceso-response.interface';
import { EstadoProcesoRepository } from '../estado-proceso.repository';
import { listarEstadosProcesoMapper, estadoProcesoMapper } from '../mappers/estado-proceso.mapper';

@Injectable()
export class ListarEstadoProcesoUseCase {
  constructor(private readonly repository: EstadoProcesoRepository) {}

  async execute(): Promise<EstadoProcesoResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarEstadosProcesoMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los estados de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<EstadoProcesoResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Estado de proceso con ID ${id} no encontrado`);
      return estadoProcesoMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el estado de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
