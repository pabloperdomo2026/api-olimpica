import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TasaCambioResponse } from '../interfaces/tasa-cambio-response.interface';
import { TasaCambioRepository } from '../tasa-cambio.repository';
import { listarTasasCambioMapper, tasaCambioMapper } from '../mappers/tasa-cambio.mapper';

@Injectable()
export class ListarTasaCambioUseCase {
  constructor(private readonly repository: TasaCambioRepository) {}

  async execute(): Promise<TasaCambioResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarTasasCambioMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener las tasas de cambio', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: number): Promise<TasaCambioResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Tasa de cambio con ID ${id} no encontrada`);
      return tasaCambioMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener la tasa de cambio', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
