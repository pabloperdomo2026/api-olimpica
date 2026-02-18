import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaDestinoResponse } from '../interfaces/columna-destino-response.interface';
import { ColumnaDestinoRepository } from '../columna-destino.repository';
import { CrearColumnaDestinoDto } from '../dtos';
import { columnaDestinoMapper } from '../mappers/columna-destino.mapper';

@Injectable()
export class CrearColumnaDestinoUseCase {
  constructor(private readonly repository: ColumnaDestinoRepository) {}

  async execute(dto: CrearColumnaDestinoDto): Promise<ColumnaDestinoResponse> {
    try {
      const creado = await this.repository.crear({
        nombreColumna: dto.nombreColumna,
        destinoId: dto.destinoId,
        tipoDatoId: dto.tipoDatoId,
        posicionOrdinal: dto.posicionOrdinal ?? undefined,
        esNullable: dto.esNullable ?? true,
        esPii: dto.esPii ?? false,
        obligaCase: dto.obligaCase ?? undefined,
        formatoEsperado: dto.formatoEsperado || undefined,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return columnaDestinoMapper(creado);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al crear la columna destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
