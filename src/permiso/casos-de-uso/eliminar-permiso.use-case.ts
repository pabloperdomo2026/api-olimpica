import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PermisoRepository } from '../permiso.repository';

export interface EliminarPermisoResponse {
  mensaje: string;
  permisoId: string;
}

@Injectable()
export class EliminarPermisoUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(id: string): Promise<EliminarPermisoResponse> {
    try {
      const permiso = await this.permisoRepository.obtenerPorId(id);

      if (!permiso) {
        throw new NotFoundException(`Permiso con id ${id} no encontrado`);
      }

      await this.permisoRepository.eliminar(id);

      return {
        mensaje: `Permiso con id ${id} eliminado correctamente`,
        permisoId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al eliminar el permiso',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
