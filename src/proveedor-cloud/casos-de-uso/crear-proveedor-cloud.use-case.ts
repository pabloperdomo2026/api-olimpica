import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { ProveedorCloudRepository } from '../proveedor-cloud.repository';
import { CrearProveedorCloudDto } from '../dtos';
import { ProveedorCloudResponse } from '../interfaces/proveedor-cloud-response.interface';
import { proveedorCloudMapper } from '../mappers/proveedor-cloud.mapper';

@Injectable()
export class CrearProveedorCloudUseCase {
  constructor(private readonly proveedorCloudRepository: ProveedorCloudRepository) {}

  async execute(dto: CrearProveedorCloudDto): Promise<ProveedorCloudResponse> {
    try {
      const existeCodigo = await this.proveedorCloudRepository.obtenerPorCodigo(dto.codigo);
      if (existeCodigo) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.proveedorCloudRepository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        urlBase: dto.urlBase,
        activo: 'A',
      });

      return proveedorCloudMapper(creado);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al crear proveedor cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
