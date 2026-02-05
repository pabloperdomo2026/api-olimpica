import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { RolRepository } from '../rol.repository';

export interface EliminarRolResponse {
  mensaje: string;
  rolId: string;
}

@Injectable()
export class EliminarRolUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async execute(id: string): Promise<EliminarRolResponse> {
    try {
      const rol = await this.rolRepository.obtenerPorId(id);

      if (!rol) {
        throw new NotFoundException(`Rol con id ${id} no encontrado`);
      }

      await this.rolRepository.eliminar(id);

      return {
        mensaje: `Rol con id ${id} eliminado correctamente`,
        rolId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al eliminar el rol',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
