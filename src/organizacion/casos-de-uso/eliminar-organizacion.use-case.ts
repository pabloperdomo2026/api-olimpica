import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { OrganizacionRepository } from '../organizacion.repository';

export interface EliminarOrganizacionResponse {
  mensaje: string;
  organizacionId: string;
}

@Injectable()
export class EliminarOrganizacionUseCase {
  constructor(private readonly organizacionRepository: OrganizacionRepository) {}

  async execute(id: string): Promise<EliminarOrganizacionResponse> {
    try {
      const organizacion = await this.organizacionRepository.obtenerPorId(id);

      if (!organizacion) {
        throw new NotFoundException(`Organizacion con id ${id} no encontrada`);
      }

      await this.organizacionRepository.eliminar(id);

      return {
        mensaje: `Organizacion con id ${id} eliminada correctamente`,
        organizacionId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al eliminar la organizacion',
          errorMessage: error.message,
        },
        error.status || 500,
      );
    }
  }
}
