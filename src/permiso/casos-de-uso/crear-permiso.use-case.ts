import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { PermisoResponse } from '../interfaces/permiso-response.interface';
import { Permiso } from '../interfaces/permiso.interface';
import { PermisoRepository } from '../permiso.repository';
import { CrearPermisoDto } from '../dtos';
import { permisoMapper } from '../mappers/permiso.mapper';

@Injectable()
export class CrearPermisoUseCase {
  constructor(private readonly permisoRepository: PermisoRepository) {}

  async execute(dto: CrearPermisoDto): Promise<PermisoResponse> {
    try {
      const existeCodigo = await this.permisoRepository.obtenerPorCodigo(dto.codigo);

      if (existeCodigo) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const nuevoPermiso: Permiso = {
        codigo: dto.codigo,
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        activo: 'S',
        fechaCreacion: new Date(),
        usuarioCreacion: 'admin@olimpica.com',
      };

      const permisoCreado = await this.permisoRepository.crear(nuevoPermiso);

      return permisoMapper(permisoCreado);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al crear el permiso',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
