import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { MonedaRepository } from '../moneda.repository';

export interface EliminarMonedaResponse {
  mensaje: string;
  monedaId: string;
}

@Injectable()
export class EliminarMonedaUseCase {
  constructor(private readonly monedaRepository: MonedaRepository) {}

  async execute(id: string): Promise<EliminarMonedaResponse> {
    try {
      const moneda = await this.monedaRepository.obtenerPorId(id);

      if (!moneda) {
        throw new NotFoundException(`Moneda con id ${id} no encontrada`);
      }

      await this.monedaRepository.eliminar(id);

      return {
        mensaje: `Moneda con id ${id} eliminada correctamente`,
        monedaId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al eliminar la moneda',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
