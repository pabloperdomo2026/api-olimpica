import { Injectable, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { OrganizacionResponse } from '../interfaces/organizacion-response.interface';
import { OrganizacionRepository } from '../organizacion.repository';
import { ActualizarOrganizacionDto } from '../dtos';
import { organizacionMapper } from '../mappers/listar-organizaciones.mapper';

@Injectable()
export class EditarOrganizacionUseCase {
  constructor(private readonly organizacionRepository: OrganizacionRepository) {}

  async execute(id: string, dto: ActualizarOrganizacionDto): Promise<OrganizacionResponse> {
    try {
      const organizacionExistente = await this.organizacionRepository.obtenerPorId(id);

      if (!organizacionExistente) {
        throw new NotFoundException(`Organizacion con id ${id} no encontrada`);
      }

      const organizacionActualizada = await this.organizacionRepository.actualizar(id, {
        nombreOrg: dto.nombreOrg,
        razonSocial: dto.razonSocial,
        pais: dto.pais,
        ciudad: dto.ciudad,
        direccion: dto.direccion,
        telefonoContacto: dto.telefonoContacto,
        emailContacto: dto.emailContacto,
        activo: dto.activo,
        perteneceA: dto.perteneceA,
      });

      if (!organizacionActualizada) {
        throw new BadRequestException('Organizacion no existe')
      }

      return organizacionMapper(organizacionActualizada);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al editar la organizacion',
          errorMessage: error.message,
        },
        error.status || 500,
      );
    }
  }
}
