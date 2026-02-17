import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProveedorCloudRepository } from '../proveedor-cloud.repository';
import { ProveedorCloudResponse } from '../interfaces/proveedor-cloud-response.interface';
import { listarProveedoresCloudMapper, proveedorCloudMapper } from '../mappers/proveedor-cloud.mapper';

@Injectable()
export class ListarProveedoresCloudUseCase {
  constructor(private readonly proveedorCloudRepository: ProveedorCloudRepository) {}

  async execute(): Promise<ProveedorCloudResponse[]> {
    try {
      const proveedores = await this.proveedorCloudRepository.listarTodos();
      return listarProveedoresCloudMapper(proveedores);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al listar proveedores cloud', errorMessage: error.message },
        500,
      );
    }
  }

  async executeById(id: string): Promise<ProveedorCloudResponse> {
    try {
      const proveedor = await this.proveedorCloudRepository.obtenerPorId(id);
      if (!proveedor) {
        throw new NotFoundException(`Proveedor cloud con id ${id} no encontrado`);
      }
      return proveedorCloudMapper(proveedor);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al obtener proveedor cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
