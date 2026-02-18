import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDatoResponse } from '../interfaces/tipo-dato-response.interface';
import { TipoDatoRepository } from '../tipo-dato.repository';
import { CrearTipoDatoDto } from '../dtos';
import { tipoDatoMapper } from '../mappers/tipo-dato.mapper';

@Injectable()
export class CrearTipoDatoUseCase {
  constructor(private readonly repository: TipoDatoRepository) {}

  async execute(dto: CrearTipoDatoDto): Promise<TipoDatoResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        tipoSql: dto.tipoSql,
        tipoPython: dto.tipoPython,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return tipoDatoMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el tipo de dato', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
