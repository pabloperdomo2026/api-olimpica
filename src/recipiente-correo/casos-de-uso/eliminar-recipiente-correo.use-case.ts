import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RecipienteCorreoRepository } from '../recipiente-correo.repository';

export interface EliminarRecipienteCorreoResponse {
  mensaje: string;
}

@Injectable()
export class EliminarRecipienteCorreoUseCase {
  constructor(private readonly repository: RecipienteCorreoRepository) {}

  async execute(id: string): Promise<EliminarRecipienteCorreoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Recipiente de correo con id ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: 'Recipiente de correo eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el recipiente de correo', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
