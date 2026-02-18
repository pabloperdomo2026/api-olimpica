import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { ProcesoMapeoCampoResponse } from '../interfaces/proceso-mapeo-campo-response.interface';
import { ProcesoMapeoCampoRepository } from '../proceso-mapeo-campo.repository';
import { ActualizarProcesoMapeoCampoDto } from '../dtos';
import { procesoMapeoCampoMapper } from '../mappers/proceso-mapeo-campo.mapper';

@Injectable()
export class ActualizarProcesoMapeoCampoUseCase {
  constructor(private readonly repository: ProcesoMapeoCampoRepository) {}

  async execute(id: string, dto: ActualizarProcesoMapeoCampoDto): Promise<ProcesoMapeoCampoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);

      if (!existente) {
        throw new NotFoundException(`Mapeo de campo con id ${id} no encontrado`);
      }

      const datosActualizar: Record<string, unknown> = {};

      if (dto.nombreColumna !== undefined) datosActualizar.nombreColumna = dto.nombreColumna;
      if (dto.nombreCampoDestino !== undefined) datosActualizar.nombreCampoDestino = dto.nombreCampoDestino;
      if (dto.tipoExpresion !== undefined) datosActualizar.tipoExpresion = dto.tipoExpresion;
      if (dto.procesoId !== undefined) datosActualizar.procesoId = dto.procesoId;
      if (dto.columnaOrigenId !== undefined) datosActualizar.columnaOrigenId = dto.columnaOrigenId;
      if (dto.columnaDestinoId !== undefined) datosActualizar.columnaDestinoId = dto.columnaDestinoId;
      if (dto.secuenciaGeneracionTabular !== undefined) datosActualizar.secuenciaGeneracionTabular = dto.secuenciaGeneracionTabular;
      if (dto.posicionOrdinal !== undefined) datosActualizar.posicionOrdinal = dto.posicionOrdinal;
      if (dto.esNullable !== undefined) datosActualizar.esNullable = dto.esNullable;
      if (dto.esPii !== undefined) datosActualizar.esPii = dto.esPii;
      if (dto.nombreCampoOrigen !== undefined) datosActualizar.nombreCampoOrigen = dto.nombreCampoOrigen;
      if (dto.destinoObligaCase !== undefined) datosActualizar.destinoObligaCase = dto.destinoObligaCase;
      if (dto.formatoOrigen !== undefined) datosActualizar.formatoOrigen = dto.formatoOrigen;
      if (dto.formatoDestino !== undefined) datosActualizar.formatoDestino = dto.formatoDestino;
      if (dto.expresionTransformacion !== undefined) datosActualizar.expresionTransformacion = dto.expresionTransformacion;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';

      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);

      if (!actualizado) {
        throw new BadRequestException('No se pudo actualizar el mapeo de campo');
      }

      return procesoMapeoCampoMapper(actualizado);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al actualizar el mapeo de campo',
          errorMessage: error.response ?? error.message,
        },
        error.status || 500,
      );
    }
  }
}
