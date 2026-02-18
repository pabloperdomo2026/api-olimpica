import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDatoRepository } from '../tipo-dato.repository';

export interface EliminarTipoDatoResponse {
  mensaje: string;
}

@Injectable()
export class EliminarTipoDatoUseCase {
  constructor(private readonly repository: TipoDatoRepository) {}

  async execute(id: string): Promise<EliminarTipoDatoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de dato con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Tipo de dato ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el tipo de dato', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
