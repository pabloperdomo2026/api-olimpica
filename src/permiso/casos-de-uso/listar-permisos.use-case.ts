import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PermisoResponse } from '../interfaces/permiso-response.interface';
import { PermisoRepository } from '../permiso.repository';
import { listarPermisosMapper, permisoMapper } from '../mappers/permiso.mapper';

@Injectable()
export class ListarPermisosUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(): Promise<PermisoResponse[]> {
    try {
      const permisos = await this.permisoRepository.listarTodos();
      return listarPermisosMapper(permisos);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener los permisos',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<PermisoResponse> {
    try {
      const permiso = await this.permisoRepository.obtenerPorId(id);

      if (!permiso) {
        throw new NotFoundException(`Permiso con id ${id} no encontrado`);
      }

      return permisoMapper(permiso);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al obtener el permiso',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
