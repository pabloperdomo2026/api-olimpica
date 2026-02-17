import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { MonedaResponse } from '../interfaces/moneda-response.interface';
import { Moneda } from '../interfaces/moneda.interface';
import { MonedaRepository } from '../moneda.repository';
import { CrearMonedaDto } from '../dtos';
import { monedaMapper } from '../mappers/moneda.mapper';

@Injectable()
export class CrearMonedaUseCase {
  constructor(private readonly monedaRepository: MonedaRepository) {}

  async execute(dto: CrearMonedaDto): Promise<MonedaResponse> {
    try {
      const existeCodigo = await this.monedaRepository.obtenerPorCodigo(dto.codigoMoneda);

      if (existeCodigo) {
        throw new ConflictException(`El codigo ${dto.codigoMoneda} ya esta registrado`);
      }

      const nuevaMoneda: Moneda = {
        codigoMoneda: dto.codigoMoneda,
        codigoIso4217: dto.codigoIso4217,
        nombreMoneda: dto.nombreMoneda,
        simboloMoneda: dto.simboloMoneda,
        numeroDecimales: dto.numeroDecimales ?? 2,
        esMonedaBase: dto.esMonedaBase ?? false,
        activo: 'S',
        fechaCreacion: new Date(),
        usuarioCreacion: 'admin@olimpica.com',
      };

      const monedaCreada = await this.monedaRepository.crear(nuevaMoneda);

      return monedaMapper(monedaCreada);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al crear la moneda',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
