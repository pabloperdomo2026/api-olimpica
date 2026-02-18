import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoProgramacionResponse } from '../interfaces/tipo-programacion-response.interface';
import { TipoProgramacionRepository } from '../tipo-programacion.repository';
import { CrearTipoProgramacionDto } from '../dtos';
import { tipoProgramacionMapper } from '../mappers/tipo-programacion.mapper';

@Injectable()
export class CrearTipoProgramacionUseCase {
  constructor(private readonly repository: TipoProgramacionRepository) {}

  async execute(dto: CrearTipoProgramacionDto): Promise<TipoProgramacionResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        requiereCron: dto.requiereCron ?? false,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return tipoProgramacionMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el tipo de programacion', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
