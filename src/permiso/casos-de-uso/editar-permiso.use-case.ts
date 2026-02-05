import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PermisoResponse } from '../interfaces/permiso-response.interface';
import { PermisoRepository } from '../permiso.repository';
import { ActualizarPermisoDto } from '../dtos';
import { permisoMapper } from '../mappers/permiso.mapper';

@Injectable()
export class EditarPermisoUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(id: string, dto: ActualizarPermisoDto): Promise<PermisoResponse> {
    try {
      const permisoExistente = await this.permisoRepository.obtenerPorId(id);

      if (!permisoExistente) {
        throw new NotFoundException(`Permiso con id ${id} no encontrado`);
      }

      const permisoActualizado = await this.permisoRepository.actualizar(id, {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        activo: dto.activo,
        usuarioModificacion: 'admin@olimpica.com',
      });

      if (!permisoActualizado) {
        throw new BadRequestException('Error al actualizar el permiso');
      }

      return permisoMapper(permisoActualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al editar el permiso',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
