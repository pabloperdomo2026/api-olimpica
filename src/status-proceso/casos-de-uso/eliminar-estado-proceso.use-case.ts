import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { EstadoProcesoRepository } from '../estado-proceso.repository';

export interface EliminarEstadoProcesoResponse {
  mensaje: string;
}

@Injectable()
export class EliminarEstadoProcesoUseCase {
  constructor(private readonly repository: EstadoProcesoRepository) {}

  async execute(id: string): Promise<EliminarEstadoProcesoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Estado de proceso con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Estado de proceso ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el estado de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
