import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoProgramacionResponse } from '../interfaces/tipo-programacion-response.interface';
import { TipoProgramacionRepository } from '../tipo-programacion.repository';
import { listarTipoProgramacionesMapper, tipoProgramacionMapper } from '../mappers/tipo-programacion.mapper';

@Injectable()
export class ListarTipoProgramacionUseCase {
  constructor(private readonly repository: TipoProgramacionRepository) {}

  async execute(): Promise<TipoProgramacionResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarTipoProgramacionesMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los tipos de programacion', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<TipoProgramacionResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Tipo de programacion con ID ${id} no encontrado`);
      return tipoProgramacionMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el tipo de programacion', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
