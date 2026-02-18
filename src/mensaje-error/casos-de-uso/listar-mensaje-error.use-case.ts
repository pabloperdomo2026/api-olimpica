import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { MensajeErrorResponse } from '../interfaces/mensaje-error-response.interface';
import { MensajeErrorRepository } from '../mensaje-error.repository';
import { listarMensajesErrorMapper, mensajeErrorMapper } from '../mappers/mensaje-error.mapper';

@Injectable()
export class ListarMensajeErrorUseCase {
  constructor(private readonly repository: MensajeErrorRepository) {}

  async execute(): Promise<MensajeErrorResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarMensajesErrorMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los mensajes de error', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<MensajeErrorResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Mensaje de error con ID ${id} no encontrado`);
      return mensajeErrorMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el mensaje de error', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
