import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ColumnaOrigenResponse } from '../interfaces/columna-origen-response.interface';
import { ColumnaOrigenRepository } from '../columna-origen.repository';
import { ActualizarColumnaOrigenDto } from '../dtos';
import { columnaOrigenMapper } from '../mappers/columna-origen.mapper';

@Injectable()
export class ActualizarColumnaOrigenUseCase {
  constructor(private readonly repository: ColumnaOrigenRepository) {}

  async execute(id: string, dto: ActualizarColumnaOrigenDto): Promise<ColumnaOrigenResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) {
        throw new HttpException(
          { description: 'Columna origen no encontrada', errorMessage: `No existe una columna origen con id '${id}'` },
          HttpStatus.NOT_FOUND,
        );
      }

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

      const actualizado = await this.repository.actualizar(id, datosActualizar as any);
      if (!actualizado) {
        throw new HttpException(
          { description: 'Error al actualizar la columna origen', errorMessage: 'No se pudo recuperar el registro actualizado' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return columnaOrigenMapper(actualizado);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar la columna origen', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
