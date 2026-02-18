import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoProcesoResponse } from '../interfaces/tipo-proceso-response.interface';
import { TipoProcesoRepository } from '../tipo-proceso.repository';
import { CrearTipoProcesoDto } from '../dtos';
import { tipoProcesoMapper } from '../mappers/tipo-proceso.mapper';

@Injectable()
export class CrearTipoProcesoUseCase {
  constructor(private readonly repository: TipoProcesoRepository) {}

  async execute(dto: CrearTipoProcesoDto): Promise<TipoProcesoResponse> {
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

      return tipoProcesoMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el tipo de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
