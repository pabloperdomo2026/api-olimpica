import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { PuntoVentaResponse } from '../interfaces/punto-venta-response.interface';
import { PuntoVentaRepository } from '../punto-venta.repository';
import { ActualizarPuntoVentaDto } from '../dtos';
import { puntoVentaMapper } from '../mappers/punto-venta.mapper';

@Injectable()
export class EditarPuntoVentaUseCase {
  constructor(private readonly puntoVentaRepository: PuntoVentaRepository) {}

  async execute(id: string, dto: ActualizarPuntoVentaDto): Promise<PuntoVentaResponse> {
    try {
      const puntoVentaExistente = await this.puntoVentaRepository.obtenerPorId(id);

      if (!puntoVentaExistente) {
        throw new NotFoundException(`Punto de venta con id ${id} no encontrado`);
      }

      const puntoVentaActualizado = await this.puntoVentaRepository.actualizar(id, {
        nombreTienda: dto.nombreTienda,
        ciudad: dto.ciudad,
        direccion: dto.direccion,
        activo: dto.activo,
        usuarioModificacion: 'admin@olimpica.com',
      });

      if (!puntoVentaActualizado) {
        throw new BadRequestException('Error al actualizar el punto de venta');
      }

      return puntoVentaMapper(puntoVentaActualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al editar el punto de venta',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
