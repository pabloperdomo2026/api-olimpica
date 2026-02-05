import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PuntoVentaRepository } from '../punto-venta.repository';

export interface EliminarPuntoVentaResponse {
  mensaje: string;
  puntoVentaId: string;
}

@Injectable()
export class EliminarPuntoVentaUseCase {
  constructor(private readonly puntoVentaRepository: PuntoVentaRepository) {}

  async execute(id: string): Promise<EliminarPuntoVentaResponse> {
    try {
      const puntoVenta = await this.puntoVentaRepository.obtenerPorId(id);

      if (!puntoVenta) {
        throw new NotFoundException(`Punto de venta con id ${id} no encontrado`);
      }

      await this.puntoVentaRepository.eliminar(id);

      return {
        mensaje: `Punto de venta con id ${id} eliminado correctamente`,
        puntoVentaId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al eliminar el punto de venta',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
