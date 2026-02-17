import { Injectable, HttpException } from '@nestjs/common';
import { ServicioCloudRepository } from '../servicio-cloud.repository';
import { CrearServicioCloudDto } from '../dtos';
import { ServicioCloudResponse } from '../interfaces/servicio-cloud-response.interface';
import { servicioCloudMapper } from '../mappers/servicio-cloud.mapper';

@Injectable()
export class CrearServicioCloudUseCase {
  constructor(private readonly servicioCloudRepository: ServicioCloudRepository) {}

  async execute(dto: CrearServicioCloudDto): Promise<ServicioCloudResponse> {
    try {
      const creado = await this.servicioCloudRepository.crear({
        proveedorCloudId: dto.proveedorCloudId,
        region: dto.region,
        cloudAccount: dto.cloudAccount,
        tokenSecret: dto.tokenSecret || '',
        tipoServicio: dto.tipoServicio,
        nombreServicio: dto.nombreServicio,
        uriRecurso: dto.uriRecurso,
        parametrosJson: dto.parametrosJson || '{}',
        permiteInicio: 'N',
        permiteDetener: 'N',
        activo: 'A',
        organizacionId: dto.organizacionId,
        usuarioCreacion: 'sistema',
      });

      const completo = await this.servicioCloudRepository.obtenerPorId(creado.id);
      return servicioCloudMapper(completo!);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al crear servicio cloud', errorMessage: error.message },
        500,
      );
    }
  }
}
