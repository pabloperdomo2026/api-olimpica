import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProveedorCloudRepository } from '../proveedor-cloud.repository';
import { ActualizarProveedorCloudDto } from '../dtos';
import { ProveedorCloudResponse } from '../interfaces/proveedor-cloud-response.interface';
import { proveedorCloudMapper } from '../mappers/proveedor-cloud.mapper';

@Injectable()
export class EditarProveedorCloudUseCase {
  constructor(private readonly proveedorCloudRepository: ProveedorCloudRepository) {}

  async execute(id: string, dto: ActualizarProveedorCloudDto): Promise<ProveedorCloudResponse> {
    try {
      const existente = await this.proveedorCloudRepository.obtenerPorId(id);
      if (!existente) {
        throw new NotFoundException(`Proveedor cloud con id ${id} no encontrado`);
      }

      const actualizado = await this.proveedorCloudRepository.actualizar(id, {
        ...(dto.nombre !== undefined && { nombre: dto.nombre }),
        ...(dto.urlBase !== undefined && { urlBase: dto.urlBase }),
        ...(dto.activo !== undefined && { activo: dto.activo }),
      });

      return proveedorCloudMapper(actualizado!);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al editar proveedor cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
