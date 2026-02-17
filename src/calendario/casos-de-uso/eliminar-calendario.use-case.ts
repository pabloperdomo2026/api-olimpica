import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CalendarioRepository } from '../calendario.repository';

export interface EliminarCalendarioResponse {
  mensaje: string;
}

@Injectable()
export class EliminarCalendarioUseCase {
  constructor(private readonly repository: CalendarioRepository) {}

  async execute(fechaId: number): Promise<EliminarCalendarioResponse> {
    try {
      const existente = await this.repository.obtenerPorId(fechaId);

      if (!existente) {
        throw new NotFoundException(`Calendario con ID ${fechaId} no encontrado`);
      }

      await this.repository.eliminar(fechaId);

      return {
        mensaje: `Calendario ${existente.fecha} eliminado correctamente`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al eliminar el calendario',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
