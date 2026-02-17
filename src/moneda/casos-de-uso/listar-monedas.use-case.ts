import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { MonedaResponse } from '../interfaces/moneda-response.interface';
import { MonedaRepository } from '../moneda.repository';
import { listarMonedasMapper, monedaMapper } from '../mappers/moneda.mapper';

@Injectable()
export class ListarMonedasUseCase {
  constructor(private readonly monedaRepository: MonedaRepository) {}

  async execute(): Promise<MonedaResponse[]> {
    try {
      const monedas = await this.monedaRepository.listarTodos();
      return listarMonedasMapper(monedas);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener las monedas',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<MonedaResponse> {
    try {
      const moneda = await this.monedaRepository.obtenerPorId(id);

      if (!moneda) {
        throw new NotFoundException(`Moneda con id ${id} no encontrada`);
      }

      return monedaMapper(moneda);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al obtener la moneda',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
