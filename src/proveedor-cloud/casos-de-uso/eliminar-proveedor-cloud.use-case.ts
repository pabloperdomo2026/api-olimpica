import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProveedorCloudRepository } from '../proveedor-cloud.repository';

export interface EliminarProveedorCloudResponse {
  mensaje: string;
  proveedorCloudId: string;
}

@Injectable()
export class EliminarProveedorCloudUseCase {
  constructor(private readonly proveedorCloudRepository: ProveedorCloudRepository) {}

  async execute(id: string): Promise<EliminarProveedorCloudResponse> {
    try {
      const existente = await this.proveedorCloudRepository.obtenerPorId(id);
      if (!existente) {
        throw new NotFoundException(`Proveedor cloud con id ${id} no encontrado`);
      }

      await this.proveedorCloudRepository.eliminar(id);

      return {
        mensaje: `Proveedor cloud con id ${id} eliminado correctamente`,
        proveedorCloudId: id,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar proveedor cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
