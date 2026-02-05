import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProcesoRepository } from '../proceso.repository';

export interface EliminarProcesoResponse {
  mensaje: string;
  procesoId: string;
}

@Injectable()
export class EliminarProcesoUseCase {
  constructor(private readonly procesoRepository: ProcesoRepository) {}

  async execute(id: string): Promise<EliminarProcesoResponse> {
    try {
      const proceso = await this.procesoRepository.obtenerPorId(id);

      if (!proceso) {
        throw new NotFoundException(`Proceso con id ${id} no encontrado`);
      }

      await this.procesoRepository.eliminar(id);

      return {
        mensaje: `Proceso con id ${id} eliminado correctamente`,
        procesoId: id,
      };
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al eliminar el proceso',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
