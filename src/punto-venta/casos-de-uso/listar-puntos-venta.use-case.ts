import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PuntoVentaResponse } from '../interfaces/punto-venta-response.interface';
import { PuntoVentaRepository } from '../punto-venta.repository';
import { listarPuntosVentaMapper, puntoVentaMapper } from '../mappers/punto-venta.mapper';

@Injectable()
export class ListarPuntosVentaUseCase {
  constructor(private readonly puntoVentaRepository: PuntoVentaRepository) {}

  async execute(organizacionId?: string): Promise<PuntoVentaResponse[]> {
    try {
      let puntosVenta;

      if (organizacionId) {
        puntosVenta = await this.puntoVentaRepository.listarPorOrganizacion(organizacionId);
      } else {
        puntosVenta = await this.puntoVentaRepository.listarTodos();
      }

      return listarPuntosVentaMapper(puntosVenta);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener los puntos de venta',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<PuntoVentaResponse> {
    try {
      const puntoVenta = await this.puntoVentaRepository.obtenerPorId(id);

      if (!puntoVenta) {
        throw new NotFoundException(`Punto de venta con id ${id} no encontrado`);
      }

      return puntoVentaMapper(puntoVenta);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al obtener el punto de venta',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
