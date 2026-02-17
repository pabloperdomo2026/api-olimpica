import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { MonedaResponse } from '../interfaces/moneda-response.interface';
import { MonedaRepository } from '../moneda.repository';
import { ActualizarMonedaDto } from '../dtos';
import { monedaMapper } from '../mappers/moneda.mapper';

@Injectable()
export class EditarMonedaUseCase {
  constructor(private readonly monedaRepository: MonedaRepository) {}

  async execute(id: string, dto: ActualizarMonedaDto): Promise<MonedaResponse> {
    try {
      const monedaExistente = await this.monedaRepository.obtenerPorId(id);

      if (!monedaExistente) {
        throw new NotFoundException(`Moneda con id ${id} no encontrada`);
      }

      const monedaActualizada = await this.monedaRepository.actualizar(id, {
        nombreMoneda: dto.nombreMoneda,
        simboloMoneda: dto.simboloMoneda,
        numeroDecimales: dto.numeroDecimales,
        esMonedaBase: dto.esMonedaBase,
        activo: dto.activo,
        usuarioModificacion: 'admin@olimpica.com',
      });

      if (!monedaActualizada) {
        throw new BadRequestException('Error al actualizar la moneda');
      }

      return monedaMapper(monedaActualizada);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al editar la moneda',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
