import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ServicioCloudRepository } from '../servicio-cloud.repository';
import { ActualizarServicioCloudDto } from '../dtos';
import { ServicioCloudResponse } from '../interfaces/servicio-cloud-response.interface';
import { servicioCloudMapper } from '../mappers/servicio-cloud.mapper';

@Injectable()
export class EditarServicioCloudUseCase {
  constructor(private readonly servicioCloudRepository: ServicioCloudRepository) {}

  async execute(id: string, dto: ActualizarServicioCloudDto): Promise<ServicioCloudResponse> {
    try {
      const existente = await this.servicioCloudRepository.obtenerPorId(id);
      if (!existente) {
        throw new NotFoundException(`Servicio cloud con id ${id} no encontrado`);
      }

      const actualizado = await this.servicioCloudRepository.actualizar(id, {
        ...(dto.proveedorCloudId !== undefined && { proveedorCloudId: dto.proveedorCloudId }),
        ...(dto.region !== undefined && { region: dto.region }),
        ...(dto.cloudAccount !== undefined && { cloudAccount: dto.cloudAccount }),
        ...(dto.tokenSecret !== undefined && { tokenSecret: dto.tokenSecret }),
        ...(dto.tipoServicio !== undefined && { tipoServicio: dto.tipoServicio }),
        ...(dto.nombreServicio !== undefined && { nombreServicio: dto.nombreServicio }),
        ...(dto.uriRecurso !== undefined && { uriRecurso: dto.uriRecurso }),
        ...(dto.parametrosJson !== undefined && { parametrosJson: dto.parametrosJson }),
        ...(dto.permiteInicio !== undefined && { permiteInicio: dto.permiteInicio }),
        ...(dto.permiteDetener !== undefined && { permiteDetener: dto.permiteDetener }),
        ...(dto.activo !== undefined && { activo: dto.activo }),
        ...(dto.organizacionId !== undefined && { organizacionId: dto.organizacionId }),
      });

      return servicioCloudMapper(actualizado!);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al editar servicio cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
