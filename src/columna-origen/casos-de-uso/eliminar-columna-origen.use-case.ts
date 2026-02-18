import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaOrigenRepository } from '../columna-origen.repository';

export interface EliminarColumnaOrigenResponse {
  mensaje: string;
  id: string;
}

@Injectable()
export class EliminarColumnaOrigenUseCase {
  constructor(private readonly repository: ColumnaOrigenRepository) {}

  async execute(id: string): Promise<EliminarColumnaOrigenResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) {
        throw new HttpException(
          { description: 'Columna origen no encontrada', errorMessage: `No existe una columna origen con id '${id}'` },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.repository.eliminar(id);
      return { mensaje: 'Columna origen eliminada correctamente', id };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar la columna origen', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
