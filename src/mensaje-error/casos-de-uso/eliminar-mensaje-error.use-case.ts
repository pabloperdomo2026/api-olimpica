import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { MensajeErrorRepository } from '../mensaje-error.repository';

export interface EliminarMensajeErrorResponse {
  mensaje: string;
}

@Injectable()
export class EliminarMensajeErrorUseCase {
  constructor(private readonly repository: MensajeErrorRepository) {}

  async execute(id: string): Promise<EliminarMensajeErrorResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Mensaje de error con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Mensaje de error ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el mensaje de error', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
