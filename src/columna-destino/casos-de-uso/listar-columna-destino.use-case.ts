import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaDestinoResponse } from '../interfaces/columna-destino-response.interface';
import { ColumnaDestinoRepository } from '../columna-destino.repository';
import { listarColumnasDestinoMapper, columnaDestinoMapper } from '../mappers/columna-destino.mapper';

@Injectable()
export class ListarColumnaDestinoUseCase {
  constructor(private readonly repository: ColumnaDestinoRepository) {}

  async execute(destinoId?: string): Promise<ColumnaDestinoResponse[]> {
    try {
      const items = destinoId
        ? await this.repository.listarPorDestino(destinoId)
        : await this.repository.listarTodos();
      return listarColumnasDestinoMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener las columnas destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<ColumnaDestinoResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Columna destino con ID ${id} no encontrada`);
      return columnaDestinoMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener la columna destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
