import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoProgramacionRepository } from '../tipo-programacion.repository';

export interface EliminarTipoProgramacionResponse {
  mensaje: string;
}

@Injectable()
export class EliminarTipoProgramacionUseCase {
  constructor(private readonly repository: TipoProgramacionRepository) {}

  async execute(id: string): Promise<EliminarTipoProgramacionResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de programacion con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Tipo de programacion ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el tipo de programacion', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
