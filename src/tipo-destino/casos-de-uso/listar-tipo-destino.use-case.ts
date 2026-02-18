import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDestinoResponse } from '../interfaces/tipo-destino-response.interface';
import { TipoDestinoRepository } from '../tipo-destino.repository';
import { listarTipoDestinosMapper, tipoDestinoMapper } from '../mappers/tipo-destino.mapper';

@Injectable()
export class ListarTipoDestinoUseCase {
  constructor(private readonly repository: TipoDestinoRepository) {}

  async execute(): Promise<TipoDestinoResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarTipoDestinosMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los tipos de destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<TipoDestinoResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Tipo de destino con ID ${id} no encontrado`);
      return tipoDestinoMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el tipo de destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
