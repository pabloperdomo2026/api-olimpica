import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfiguracionSlaRepository } from '../configuracion-sla.repository';
import { ActualizarConfiguracionSlaDto } from '../dtos';
import { ConfiguracionSlaResponse } from '../interfaces/configuracion-sla-response.interface';
import { configuracionSlaMapper } from '../mappers/configuracion-sla.mapper';

@Injectable()
export class ActualizarConfiguracionSlaUseCase {
  constructor(private readonly repository: ConfiguracionSlaRepository) {}

  async execute(id: string, dto: ActualizarConfiguracionSlaDto): Promise<ConfiguracionSlaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Configuracion de SLA con id ${id} no encontrada`);

      const datos: Record<string, unknown> = {};
      if (dto.procesoId !== undefined) datos.procesoId = dto.procesoId;
      if (dto.nombre !== undefined) datos.nombre = dto.nombre;
      if (dto.tiempoMaximoEjecucionMinutos !== undefined) datos.tiempoMaximoEjecucionMinutos = dto.tiempoMaximoEjecucionMinutos;
      if (dto.horaLimiteFinalizacion !== undefined) datos.horaLimiteFinalizacion = new Date(dto.horaLimiteFinalizacion);
      if (dto.porcentajeRegistrosMinimo !== undefined) datos.porcentajeRegistrosMinimo = dto.porcentajeRegistrosMinimo;
      if (dto.umbralErrorPorcentaje !== undefined) datos.umbralErrorPorcentaje = dto.umbralErrorPorcentaje;
      if (dto.activo !== undefined) datos.activo = dto.activo ? 'S' : 'N';

      const actualizado = await this.repository.actualizar(id, datos as any);
      if (!actualizado) throw new HttpException(
        { description: 'No se pudo recuperar el registro actualizado' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      return configuracionSlaMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar configuracion de SLA', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
