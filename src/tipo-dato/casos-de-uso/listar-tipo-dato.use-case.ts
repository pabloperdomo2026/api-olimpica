import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDatoResponse } from '../interfaces/tipo-dato-response.interface';
import { TipoDatoRepository } from '../tipo-dato.repository';
import { listarTipoDatosMapper, tipoDatoMapper } from '../mappers/tipo-dato.mapper';

@Injectable()
export class ListarTipoDatoUseCase {
  constructor(private readonly repository: TipoDatoRepository) {}

  async execute(): Promise<TipoDatoResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarTipoDatosMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los tipos de dato', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<TipoDatoResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Tipo de dato con ID ${id} no encontrado`);
      return tipoDatoMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el tipo de dato', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
