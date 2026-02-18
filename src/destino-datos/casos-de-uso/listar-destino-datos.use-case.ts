import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { DestinoDatosResponse } from '../interfaces/destino-datos-response.interface';
import { DestinoDatosRepository } from '../destino-datos.repository';
import { listarDestinoDatosMapper, destinoDatosMapper } from '../mappers/destino-datos.mapper';

@Injectable()
export class ListarDestinoDatosUseCase {
  constructor(private readonly repository: DestinoDatosRepository) {}

  async execute(organizacionId?: string): Promise<DestinoDatosResponse[]> {
    try {
      const items = organizacionId
        ? await this.repository.listarPorOrganizacion(organizacionId)
        : await this.repository.listarTodos();
      return listarDestinoDatosMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los destinos de datos', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<DestinoDatosResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Destino de datos con ID ${id} no encontrado`);
      return destinoDatosMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el destino de datos', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
