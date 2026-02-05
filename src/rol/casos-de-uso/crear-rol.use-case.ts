import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { RolResponse } from '../interfaces/rol-response.interface';
import { Rol } from '../interfaces/rol.interface';
import { RolRepository } from '../rol.repository';
import { CrearRolDto } from '../dtos';
import { rolMapper } from '../mappers/rol.mapper';

@Injectable()
export class CrearRolUseCase {
  constructor(private readonly rolRepository: RolRepository) {}

  async execute(dto: CrearRolDto): Promise<RolResponse> {
    try {
      const existeCodigo = await this.rolRepository.obtenerPorCodigo(dto.codigo);

      if (existeCodigo) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const nuevoRol: Rol = {
        codigo: dto.codigo,
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        activo: 'S',
        fechaCreacion: new Date(),
        usuarioCreacion: 'admin@olimpica.com',
      };

      const rolCreado = await this.rolRepository.crear(nuevoRol);

      return rolMapper(rolCreado);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al crear el rol',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
