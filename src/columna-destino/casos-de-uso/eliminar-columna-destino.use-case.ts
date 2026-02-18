import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaDestinoRepository } from '../columna-destino.repository';

export interface EliminarColumnaDestinoResponse {
  mensaje: string;
}

@Injectable()
export class EliminarColumnaDestinoUseCase {
  constructor(private readonly repository: ColumnaDestinoRepository) {}

  async execute(id: string): Promise<EliminarColumnaDestinoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Columna destino con ID ${id} no encontrada`);

      await this.repository.eliminar(id);
      return { mensaje: `Columna destino ${existente.nombreColumna} eliminada correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar la columna destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
