import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDestinoRepository } from '../tipo-destino.repository';

export interface EliminarTipoDestinoResponse {
  mensaje: string;
}

@Injectable()
export class EliminarTipoDestinoUseCase {
  constructor(private readonly repository: TipoDestinoRepository) {}

  async execute(id: string): Promise<EliminarTipoDestinoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de destino con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Tipo de destino ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el tipo de destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
