import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { FuncionesSistemaResponse } from '../interfaces/funciones-sistema-response.interface';
import { FuncionesSistemaRepository } from '../funciones-sistema.repository';
import { CrearFuncionesSistemaDto } from '../dtos';
import { funcionSistemaMapper } from '../mappers/funciones-sistema.mapper';

@Injectable()
export class CrearFuncionesSistemaUseCase {
  constructor(private readonly repository: FuncionesSistemaRepository) {}

  async execute(dto: CrearFuncionesSistemaDto): Promise<FuncionesSistemaResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        descripcion: dto.descripcion || undefined,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return funcionSistemaMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear la funcion del sistema', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
