import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProgramacionRepository } from '../programacion.repository';
import { ActualizarProgramacionDto } from '../dtos';
import { ProgramacionResponse } from '../interfaces/programacion-response.interface';
import { programacionMapper } from '../mappers/programacion.mapper';

@Injectable()
export class ActualizarProgramacionUseCase {
  constructor(private readonly programacionRepository: ProgramacionRepository) {}

  async execute(id: string, dto: ActualizarProgramacionDto): Promise<ProgramacionResponse> {
    try {
      const existe = await this.programacionRepository.obtenerPorId(id);
      if (!existe) throw new NotFoundException(`Programacion con id ${id} no encontrada`);

      const actualizada = await this.programacionRepository.actualizar(id, {
        nombre: dto.nombre,
        expresionCron: dto.expresionCron,
        frecuenciaMinutos: dto.frecuenciaMinutos,
        activo: dto.activo,
        usuarioModificacion: dto.usuarioModificacion,
      });
      return programacionMapper(actualizada!);
    } catch (error) {
      throw new HttpException({ description: 'Error al actualizar programacion', errorMessage: error.message }, error.status || 500);
    }
  }
}
