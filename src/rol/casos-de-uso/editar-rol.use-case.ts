import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { RolResponse } from '../interfaces/rol-response.interface';
import { RolRepository } from '../rol.repository';
import { ActualizarRolDto } from '../dtos';
import { rolMapper } from '../mappers/rol.mapper';

@Injectable()
export class EditarRolUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async execute(id: string, dto: ActualizarRolDto): Promise<RolResponse> {
    try {
      const rolExistente = await this.rolRepository.obtenerPorId(id);

      if (!rolExistente) {
        throw new NotFoundException(`Rol con id ${id} no encontrado`);
      }

      const rolActualizado = await this.rolRepository.actualizar(id, {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        activo: dto.activo,
        usuarioModificacion: 'admin@olimpica.com',
      });

      if (!rolActualizado) {
        throw new BadRequestException('Error al actualizar el rol');
      }

      return rolMapper(rolActualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al editar el rol',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
