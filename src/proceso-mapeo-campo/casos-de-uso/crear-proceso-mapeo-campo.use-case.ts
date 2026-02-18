import { Injectable, HttpException } from '@nestjs/common';
import { ProcesoMapeoCampoResponse } from '../interfaces/proceso-mapeo-campo-response.interface';
import { ProcesoMapeoCampoRepository } from '../proceso-mapeo-campo.repository';
import { CrearProcesoMapeoCampoDto } from '../dtos';
import { procesoMapeoCampoMapper } from '../mappers/proceso-mapeo-campo.mapper';

@Injectable()
export class CrearProcesoMapeoCampoUseCase {
  constructor(private readonly repository: ProcesoMapeoCampoRepository) {}

  async execute(dto: CrearProcesoMapeoCampoDto): Promise<ProcesoMapeoCampoResponse> {
    try {
      const nuevo = await this.repository.crear({
        nombreColumna: dto.nombreColumna,
        nombreCampoDestino: dto.nombreCampoDestino,
        tipoExpresion: dto.tipoExpresion,
        procesoId: dto.procesoId,
        columnaOrigenId: dto.columnaOrigenId,
        columnaDestinoId: dto.columnaDestinoId,
        secuenciaGeneracionTabular: dto.secuenciaGeneracionTabular,
        posicionOrdinal: dto.posicionOrdinal,
        esNullable: dto.esNullable ?? true,
        esPii: dto.esPii ?? false,
        nombreCampoOrigen: dto.nombreCampoOrigen,
        destinoObligaCase: dto.destinoObligaCase,
        formatoOrigen: dto.formatoOrigen,
        formatoDestino: dto.formatoDestino,
        expresionTransformacion: dto.expresionTransformacion,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return procesoMapeoCampoMapper(nuevo);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al crear el mapeo de campo',
          errorMessage: error.response ?? error.message,
        },
        error.status || 500,
      );
    }
  }
}
