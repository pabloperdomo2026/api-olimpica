import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoAlertaResponse } from '../interfaces/tipo-alerta-response.interface';
import { TipoAlertaRepository } from '../tipo-alerta.repository';
import { listarTipoAlertasMapper, tipoAlertaMapper } from '../mappers/tipo-alerta.mapper';

@Injectable()
export class ListarTipoAlertaUseCase {
  constructor(private readonly repository: TipoAlertaRepository) {}

  async execute(): Promise<TipoAlertaResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarTipoAlertasMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los tipos de alerta', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<TipoAlertaResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Tipo de alerta con ID ${id} no encontrado`);
      return tipoAlertaMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el tipo de alerta', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
