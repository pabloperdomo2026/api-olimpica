import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaDestinoResponse } from '../interfaces/columna-destino-response.interface';
import { ColumnaDestinoRepository } from '../columna-destino.repository';
import { ActualizarColumnaDestinoDto } from '../dtos';
import { columnaDestinoMapper } from '../mappers/columna-destino.mapper';

@Injectable()
export class ActualizarColumnaDestinoUseCase {
  constructor(private readonly repository: ColumnaDestinoRepository) {}

  async execute(id: string, dto: ActualizarColumnaDestinoDto): Promise<ColumnaDestinoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Columna destino con ID ${id} no encontrada`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombreColumna !== undefined) datosActualizar.nombreColumna = dto.nombreColumna;
      if (dto.tipoDatoId !== undefined) datosActualizar.tipoDatoId = dto.tipoDatoId;
      if (dto.posicionOrdinal !== undefined) datosActualizar.posicionOrdinal = dto.posicionOrdinal;
      if (dto.esNullable !== undefined) datosActualizar.esNullable = dto.esNullable;
      if (dto.esPii !== undefined) datosActualizar.esPii = dto.esPii;
      if (dto.obligaCase !== undefined) datosActualizar.obligaCase = dto.obligaCase;
      if (dto.formatoEsperado !== undefined) datosActualizar.formatoEsperado = dto.formatoEsperado;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar la columna destino');

      return columnaDestinoMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar la columna destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
