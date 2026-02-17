import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ServicioCloudRepository } from '../servicio-cloud.repository';

export interface EliminarServicioCloudResponse {
  mensaje: string;
  servicioCloudId: string;
}

@Injectable()
export class EliminarServicioCloudUseCase {
  constructor(private readonly servicioCloudRepository: ServicioCloudRepository) {}

  async execute(id: string): Promise<EliminarServicioCloudResponse> {
    try {
      const existente = await this.servicioCloudRepository.obtenerPorId(id);
      if (!existente) {
        throw new NotFoundException(`Servicio cloud con id ${id} no encontrado`);
      }

      await this.servicioCloudRepository.eliminar(id);

      return {
        mensaje: `Servicio cloud con id ${id} eliminado correctamente`,
        servicioCloudId: id,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar servicio cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
