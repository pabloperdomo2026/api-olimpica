import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoFuenteResponse } from '../interfaces/tipo-fuente-response.interface';
import { TipoFuenteRepository } from '../tipo-fuente.repository';
import { listarTipoFuentesMapper, tipoFuenteMapper } from '../mappers/tipo-fuente.mapper';

@Injectable()
export class ListarTipoFuenteUseCase {
  constructor(private readonly repository: TipoFuenteRepository) {}

  async execute(): Promise<TipoFuenteResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarTipoFuentesMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los tipos de fuente', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<TipoFuenteResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Tipo de fuente con ID ${id} no encontrado`);
      return tipoFuenteMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el tipo de fuente', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
