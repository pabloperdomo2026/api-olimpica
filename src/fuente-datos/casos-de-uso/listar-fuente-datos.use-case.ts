import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FuenteDatosResponse } from '../interfaces/fuente-datos-response.interface';
import { FuenteDatosRepository } from '../fuente-datos.repository';
import { fuenteDatosMapper } from '../mappers/fuente-datos.mapper';

@Injectable()
export class ListarFuenteDatosUseCase {
  constructor(private readonly repository: FuenteDatosRepository) {}

  async execute(organizacionId?: string): Promise<FuenteDatosResponse[]> {
    try {
      const lista = organizacionId
        ? await this.repository.listarPorOrganizacion(organizacionId)
        : await this.repository.listarTodos();
      return lista.map(fuenteDatosMapper);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al listar fuentes de datos', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
