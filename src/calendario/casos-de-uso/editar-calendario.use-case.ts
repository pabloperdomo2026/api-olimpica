import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CalendarioResponse } from '../interfaces/calendario-response.interface';
import { CalendarioRepository } from '../calendario.repository';
import { ActualizarCalendarioDto } from '../dtos';
import { calendarioMapper } from '../mappers/calendario.mapper';

@Injectable()
export class EditarCalendarioUseCase {
  constructor(private readonly repository: CalendarioRepository) {}

  async execute(
    fechaId: number,
    dto: ActualizarCalendarioDto,
  ): Promise<CalendarioResponse> {
    try {
      const existente = await this.repository.obtenerPorId(fechaId);

      if (!existente) {
        throw new NotFoundException(`Calendario con ID ${fechaId} no encontrado`);
      }

      const datosActualizar: Record<string, unknown> = {};

      if (dto.pais !== undefined) datosActualizar.pais = dto.pais;
      if (dto.fecha !== undefined) datosActualizar.fecha = new Date(dto.fecha);
      if (dto.anio !== undefined) datosActualizar.anio = dto.anio;
      if (dto.mes !== undefined) datosActualizar.mes = dto.mes;
      if (dto.dia !== undefined) datosActualizar.dia = dto.dia;
      if (dto.esFinSemana !== undefined) datosActualizar.esFinSemana = dto.esFinSemana ? 'S' : 'N';
      if (dto.esFestivo !== undefined) datosActualizar.esFestivo = dto.esFestivo ? 'S' : 'N';
      if (dto.esDiaLaboral !== undefined) datosActualizar.esDiaLaboral = dto.esDiaLaboral ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(fechaId, datosActualizar);

      if (!actualizado) {
        throw new BadRequestException('Error al actualizar el calendario');
      }

      return calendarioMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al editar el calendario',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
