import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { RolResponse } from '../interfaces/rol-response.interface';
import { RolRepository } from '../rol.repository';
import { listarRolesMapper, rolMapper } from '../mappers/rol.mapper';

@Injectable()
export class ListarRolesUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async execute(): Promise<RolResponse[]> {
    try {
      const roles = await this.rolRepository.listarTodos();
      return listarRolesMapper(roles);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener los roles',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<RolResponse> {
    try {
      const rol = await this.rolRepository.obtenerPorId(id);

      if (!rol) {
        throw new NotFoundException(`Rol con id ${id} no encontrado`);
      }

      return rolMapper(rol);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al obtener el rol',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
