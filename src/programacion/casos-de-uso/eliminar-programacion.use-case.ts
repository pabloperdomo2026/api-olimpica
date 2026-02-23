import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProgramacionRepository } from '../programacion.repository';

export interface EliminarProgramacionResponse {
  eliminado: boolean;
  id: string;
}

@Injectable()
export class EliminarProgramacionUseCase {
  constructor(private readonly programacionRepository: ProgramacionRepository) {}

  async execute(id: string): Promise<EliminarProgramacionResponse> {
    try {
      const existe = await this.programacionRepository.obtenerPorId(id);
      if (!existe) throw new NotFoundException(`Programacion con id ${id} no encontrada`);
      await this.programacionRepository.eliminar(id);
      return { eliminado: true, id };
    } catch (error) {
      throw new HttpException({ description: 'Error al eliminar programacion', errorMessage: error.message }, error.status || 500);
    }
  }
}
