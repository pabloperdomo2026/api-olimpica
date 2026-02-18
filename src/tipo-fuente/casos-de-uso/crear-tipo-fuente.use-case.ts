import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoFuenteResponse } from '../interfaces/tipo-fuente-response.interface';
import { TipoFuenteRepository } from '../tipo-fuente.repository';
import { CrearTipoFuenteDto } from '../dtos';
import { tipoFuenteMapper } from '../mappers/tipo-fuente.mapper';

@Injectable()
export class CrearTipoFuenteUseCase {
  constructor(private readonly repository: TipoFuenteRepository) {}

  async execute(dto: CrearTipoFuenteDto): Promise<TipoFuenteResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        descripcion: dto.descripcion || undefined,
        categoria: dto.categoria || undefined,
        requiereCredenciales: dto.requiereCredenciales ?? false,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return tipoFuenteMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el tipo de fuente', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
