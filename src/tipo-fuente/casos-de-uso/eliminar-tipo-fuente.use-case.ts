import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoFuenteRepository } from '../tipo-fuente.repository';

export interface EliminarTipoFuenteResponse {
  mensaje: string;
}

@Injectable()
export class EliminarTipoFuenteUseCase {
  constructor(private readonly repository: TipoFuenteRepository) {}

  async execute(id: string): Promise<EliminarTipoFuenteResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de fuente con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Tipo de fuente ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el tipo de fuente', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
