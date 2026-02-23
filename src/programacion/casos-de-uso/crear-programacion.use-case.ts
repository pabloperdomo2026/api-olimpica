import { Injectable, HttpException } from '@nestjs/common';
import { ProgramacionRepository } from '../programacion.repository';
import { CrearProgramacionDto } from '../dtos';
import { ProgramacionResponse } from '../interfaces/programacion-response.interface';
import { programacionMapper } from '../mappers/programacion.mapper';

@Injectable()
export class CrearProgramacionUseCase {
  constructor(private readonly programacionRepository: ProgramacionRepository) {}

  async execute(dto: CrearProgramacionDto): Promise<ProgramacionResponse> {
    try {
      const creada = await this.programacionRepository.crear({
        procesoId: dto.procesoId,
        tipoProgramacionId: dto.tipoProgramacionId,
        nombre: dto.nombre,
        expresionCron: dto.expresionCron,
        frecuenciaMinutos: dto.frecuenciaMinutos,
        activo: 'S',
        usuarioCreacion: dto.usuarioCreacion,
      });
      return programacionMapper(creada);
    } catch (error) {
      throw new HttpException({ description: 'Error al crear programacion', errorMessage: error.message }, error.status || 500);
    }
  }
}
