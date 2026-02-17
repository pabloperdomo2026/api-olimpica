import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CalendarioResponse } from '../interfaces/calendario-response.interface';
import { CalendarioRepository } from '../calendario.repository';
import { CrearCalendarioDto } from '../dtos';
import { calendarioMapper } from '../mappers/calendario.mapper';

@Injectable()
export class CrearCalendarioUseCase {
  constructor(private readonly repository: CalendarioRepository) {}

  async execute(dto: CrearCalendarioDto): Promise<CalendarioResponse> {
    try {
      const creado = await this.repository.crear({
        pais: dto.pais,
        fecha: new Date(dto.fecha),
        anio: dto.anio,
        mes: dto.mes,
        dia: dto.dia,
        esFinSemana: dto.esFinSemana ? 'S' : 'N',
        esFestivo: dto.esFestivo ? 'S' : 'N',
        esDiaLaboral: dto.esDiaLaboral !== false ? 'S' : 'N',
        organizacionId: dto.organizacionId,
        usuarioCreacion: 'admin@olimpica.com',
      });

      return calendarioMapper(creado);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al crear el calendario',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
