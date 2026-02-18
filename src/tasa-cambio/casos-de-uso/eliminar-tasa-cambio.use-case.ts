import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TasaCambioRepository } from '../tasa-cambio.repository';

export interface EliminarTasaCambioResponse {
  mensaje: string;
}

@Injectable()
export class EliminarTasaCambioUseCase {
  constructor(private readonly repository: TasaCambioRepository) {}

  async execute(id: number): Promise<EliminarTasaCambioResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tasa de cambio con ID ${id} no encontrada`);

      await this.repository.eliminar(id);
      return { mensaje: `Tasa de cambio ${existente.tasaCambioId} eliminada correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar la tasa de cambio', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
