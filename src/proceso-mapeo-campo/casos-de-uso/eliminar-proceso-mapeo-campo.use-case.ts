import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProcesoMapeoCampoRepository } from '../proceso-mapeo-campo.repository';

export interface EliminarProcesoMapeoCampoResponse {
  mensaje: string;
  id: string;
}

@Injectable()
export class EliminarProcesoMapeoCampoUseCase {
  constructor(private readonly repository: ProcesoMapeoCampoRepository) {}

  async execute(id: string): Promise<EliminarProcesoMapeoCampoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);

      if (!existente) {
        throw new NotFoundException(`Mapeo de campo con id ${id} no encontrado`);
      }

      await this.repository.eliminar(id);

      return { mensaje: 'Mapeo de campo eliminado correctamente', id };
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al eliminar el mapeo de campo',
          errorMessage: error.response ?? error.message,
        },
        error.status || 500,
      );
    }
  }
}
