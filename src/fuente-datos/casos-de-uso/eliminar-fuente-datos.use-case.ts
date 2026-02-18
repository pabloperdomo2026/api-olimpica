import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FuenteDatosRepository } from '../fuente-datos.repository';

export interface EliminarFuenteDatosResponse {
  mensaje: string;
  id: string;
}

@Injectable()
export class EliminarFuenteDatosUseCase {
  constructor(private readonly repository: FuenteDatosRepository) {}

  async execute(id: string): Promise<EliminarFuenteDatosResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) {
        throw new HttpException(
          { description: 'Fuente de datos no encontrada', errorMessage: `No existe una fuente de datos con id '${id}'` },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.repository.eliminar(id);
      return { mensaje: 'Fuente de datos eliminada correctamente', id };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar la fuente de datos', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
