import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaOrigenResponse } from '../interfaces/columna-origen-response.interface';
import { ColumnaOrigenRepository } from '../columna-origen.repository';
import { CrearColumnaOrigenDto } from '../dtos';
import { columnaOrigenMapper } from '../mappers/columna-origen.mapper';

@Injectable()
export class CrearColumnaOrigenUseCase {
  constructor(private readonly repository: ColumnaOrigenRepository) {}

  async execute(dto: CrearColumnaOrigenDto): Promise<ColumnaOrigenResponse> {
    try {
      const creado = await this.repository.crear({
        nombreColumna: dto.nombreColumna,
        fuenteId: dto.fuenteId,
        tipoDatoId: dto.tipoDatoId,
        posicionOrdinal: dto.posicionOrdinal ?? undefined,
        esNullable: dto.esNullable ?? true,
        esPii: dto.esPii ?? false,
        obligaCase: dto.obligaCase ?? undefined,
        formatoEsperado: dto.formatoEsperado || undefined,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return columnaOrigenMapper(creado);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al crear la columna origen', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
