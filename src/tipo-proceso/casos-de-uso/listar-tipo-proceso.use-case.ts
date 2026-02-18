import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoProcesoResponse } from '../interfaces/tipo-proceso-response.interface';
import { TipoProcesoRepository } from '../tipo-proceso.repository';
import { listarTipoProcesosMapper, tipoProcesoMapper } from '../mappers/tipo-proceso.mapper';

@Injectable()
export class ListarTipoProcesoUseCase {
  constructor(private readonly repository: TipoProcesoRepository) {}

  async execute(): Promise<TipoProcesoResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarTipoProcesosMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los tipos de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<TipoProcesoResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Tipo de proceso con ID ${id} no encontrado`);
      return tipoProcesoMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el tipo de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
