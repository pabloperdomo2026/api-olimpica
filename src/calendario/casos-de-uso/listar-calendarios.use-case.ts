import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CalendarioResponse } from '../interfaces/calendario-response.interface';
import { CalendarioRepository } from '../calendario.repository';
import { listarCalendariosMapper, calendarioMapper } from '../mappers/calendario.mapper';

@Injectable()
export class ListarCalendariosUseCase {
  constructor(private readonly repository: CalendarioRepository) {}

  async execute(): Promise<CalendarioResponse[]> {
    try {
      const calendarios = await this.repository.listarTodos();
      return listarCalendariosMapper(calendarios);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener los calendarios',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(fechaId: number): Promise<CalendarioResponse> {
    try {
      const calendario = await this.repository.obtenerPorId(fechaId);

      if (!calendario) {
        throw new NotFoundException(`Calendario con ID ${fechaId} no encontrado`);
      }

      return calendarioMapper(calendario);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al obtener el calendario',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
