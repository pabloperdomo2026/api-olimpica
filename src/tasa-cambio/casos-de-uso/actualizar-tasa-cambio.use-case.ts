import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TasaCambioResponse } from '../interfaces/tasa-cambio-response.interface';
import { TasaCambioRepository } from '../tasa-cambio.repository';
import { ActualizarTasaCambioDto } from '../dtos';
import { tasaCambioMapper } from '../mappers/tasa-cambio.mapper';

@Injectable()
export class ActualizarTasaCambioUseCase {
  constructor(private readonly repository: TasaCambioRepository) {}

  async execute(id: number, dto: ActualizarTasaCambioDto): Promise<TasaCambioResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tasa de cambio con ID ${id} no encontrada`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.tasaCambio !== undefined) datosActualizar.tasaCambio = dto.tasaCambio;
      if (dto.fechaVigenciaDesde !== undefined) datosActualizar.fechaVigenciaDesde = new Date(dto.fechaVigenciaDesde);
      if (dto.fechaVigenciaHasta !== undefined) datosActualizar.fechaVigenciaHasta = new Date(dto.fechaVigenciaHasta);
      if (dto.fuenteTasa !== undefined) datosActualizar.fuenteTasa = dto.fuenteTasa;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.fechaModificacion = new Date();
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar la tasa de cambio');

      return tasaCambioMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar la tasa de cambio', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
