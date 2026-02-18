import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaOrigenResponse } from '../interfaces/columna-origen-response.interface';
import { ColumnaOrigenRepository } from '../columna-origen.repository';
import { columnaOrigenMapper } from '../mappers/columna-origen.mapper';

@Injectable()
export class ListarColumnaOrigenUseCase {
  constructor(private readonly repository: ColumnaOrigenRepository) {}

  async execute(fuenteId?: string): Promise<ColumnaOrigenResponse[]> {
    try {
      const lista = fuenteId
        ? await this.repository.listarPorFuente(fuenteId)
        : await this.repository.listarTodos();
      return lista.map(columnaOrigenMapper);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al listar columnas origen', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
