import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { PuntoVentaResponse } from '../interfaces/punto-venta-response.interface';
import { PuntoVenta } from '../interfaces/punto-venta.interface';
import { PuntoVentaRepository } from '../punto-venta.repository';
import { CrearPuntoVentaDto } from '../dtos';
import { puntoVentaMapper } from '../mappers/punto-venta.mapper';

@Injectable()
export class CrearPuntoVentaUseCase {
  constructor(private readonly puntoVentaRepository: PuntoVentaRepository) {}

  async execute(dto: CrearPuntoVentaDto): Promise<PuntoVentaResponse> {
    try {
      const existeCodigo = await this.puntoVentaRepository.obtenerPorCodigo(dto.codigoTienda);

      if (existeCodigo) {
        throw new ConflictException(`El codigo de tienda ${dto.codigoTienda} ya esta registrado`);
      }

      const nuevoPuntoVenta: PuntoVenta = {
        organizacionId: dto.organizacionId,
        codigoTienda: dto.codigoTienda,
        nombreTienda: dto.nombreTienda,
        ciudad: dto.ciudad,
        direccion: dto.direccion,
        activo: 'S',
        fechaCreacion: new Date(),
        usuarioCreacion: 'admin@olimpica.com',
      };

      const puntoVentaCreado = await this.puntoVentaRepository.crear(nuevoPuntoVenta);

      return puntoVentaMapper(puntoVentaCreado);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al crear el punto de venta',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
