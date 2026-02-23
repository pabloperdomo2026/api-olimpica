import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProgramacionRepository } from '../programacion.repository';
import { ProgramacionResponse } from '../interfaces/programacion-response.interface';
import { programacionMapper } from '../mappers/programacion.mapper';

@Injectable()
export class ListarProgramacionesUseCase {
  constructor(private readonly programacionRepository: ProgramacionRepository) {}

  async execute(): Promise<ProgramacionResponse[]> {
    try {
      const lista = await this.programacionRepository.listarTodos();
      return lista.map(programacionMapper);
    } catch (error) {
      throw new HttpException({ description: 'Error al listar programaciones', errorMessage: error.message }, error.status || 500);
    }
  }

  async executeById(id: string): Promise<ProgramacionResponse> {
    try {
      const entidad = await this.programacionRepository.obtenerPorId(id);
      if (!entidad) throw new NotFoundException(`Programacion con id ${id} no encontrada`);
      return programacionMapper(entidad);
    } catch (error) {
      throw new HttpException({ description: 'Error al obtener programacion', errorMessage: error.message }, error.status || 500);
    }
  }
}
