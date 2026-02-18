import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { DestinoDatosRepository } from '../destino-datos.repository';

export interface EliminarDestinoDatosResponse {
  mensaje: string;
}

@Injectable()
export class EliminarDestinoDatosUseCase {
  constructor(private readonly repository: DestinoDatosRepository) {}

  async execute(id: string): Promise<EliminarDestinoDatosResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Destino de datos con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Destino de datos ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el destino de datos', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
