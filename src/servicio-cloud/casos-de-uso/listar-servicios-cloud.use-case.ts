import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ServicioCloudRepository } from '../servicio-cloud.repository';
import { ServicioCloudResponse } from '../interfaces/servicio-cloud-response.interface';
import { listarServiciosCloudMapper, servicioCloudMapper } from '../mappers/servicio-cloud.mapper';

@Injectable()
export class ListarServiciosCloudUseCase {
  constructor(private readonly servicioCloudRepository: ServicioCloudRepository) {}

  async execute(): Promise<ServicioCloudResponse[]> {
    try {
      const servicios = await this.servicioCloudRepository.listarTodos();
      return listarServiciosCloudMapper(servicios);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al listar servicios cloud', errorMessage: error.message },
        500,
      );
    }
  }

  async executeById(id: string): Promise<ServicioCloudResponse> {
    try {
      const servicio = await this.servicioCloudRepository.obtenerPorId(id);
      if (!servicio) {
        throw new NotFoundException(`Servicio cloud con id ${id} no encontrado`);
      }
      return servicioCloudMapper(servicio);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al obtener servicio cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
