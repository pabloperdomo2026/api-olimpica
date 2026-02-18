import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TasaCambioResponse } from '../interfaces/tasa-cambio-response.interface';
import { TasaCambioRepository } from '../tasa-cambio.repository';
import { CrearTasaCambioDto } from '../dtos';
import { tasaCambioMapper } from '../mappers/tasa-cambio.mapper';

@Injectable()
export class CrearTasaCambioUseCase {
  constructor(private readonly repository: TasaCambioRepository) {}

  async execute(dto: CrearTasaCambioDto): Promise<TasaCambioResponse> {
    try {
      const creado = await this.repository.crear({
        monedaOrigenId: dto.monedaOrigenId,
        monedaDestinoId: dto.monedaDestinoId,
        tasaCambio: dto.tasaCambio,
        fechaVigenciaDesde: dto.fechaVigenciaDesde ? new Date(dto.fechaVigenciaDesde) : undefined,
        fechaVigenciaHasta: dto.fechaVigenciaHasta ? new Date(dto.fechaVigenciaHasta) : undefined,
        fuenteTasa: dto.fuenteTasa || undefined,
        activo: 'S',
        fechaCreacion: new Date(),
        usuarioCreacion: 'admin@olimpica.com',
      });

      return tasaCambioMapper(creado);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al crear la tasa de cambio', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
