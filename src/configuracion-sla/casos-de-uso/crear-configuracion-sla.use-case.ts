import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfiguracionSlaRepository } from '../configuracion-sla.repository';
import { CrearConfiguracionSlaDto } from '../dtos';
import { ConfiguracionSlaResponse } from '../interfaces/configuracion-sla-response.interface';
import { configuracionSlaMapper } from '../mappers/configuracion-sla.mapper';

@Injectable()
export class CrearConfiguracionSlaUseCase {
  constructor(private readonly repository: ConfiguracionSlaRepository) {}

  async execute(dto: CrearConfiguracionSlaDto): Promise<ConfiguracionSlaResponse> {
    try {
      const creado = await this.repository.crear({
        procesoId: dto.procesoId,
        nombre: dto.nombre,
        tiempoMaximoEjecucionMinutos: dto.tiempoMaximoEjecucionMinutos,
        horaLimiteFinalizacion: dto.horaLimiteFinalizacion
          ? new Date(dto.horaLimiteFinalizacion)
          : undefined,
        porcentajeRegistrosMinimo: dto.porcentajeRegistrosMinimo,
        umbralErrorPorcentaje: dto.umbralErrorPorcentaje,
        activo: 'S',
      });
      return configuracionSlaMapper(creado);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al crear configuracion de SLA', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
