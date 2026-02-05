import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { OrganizacionResponse } from '../interfaces/organizacion-response.interface';
import { OrganizacionRepository } from '../organizacion.repository';
import { listarOrganizacionesMapper, organizacionMapper } from '../mappers/listar-organizaciones.mapper';

@Injectable()
export class ListarOrganizacionesUseCase {
  constructor(private readonly organizacionRepository: OrganizacionRepository) {}

  async execute(): Promise<OrganizacionResponse[]> {
    try {
      const organizaciones = await this.organizacionRepository.listarTodos();
      return listarOrganizacionesMapper(organizaciones);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener las organizaciones',
          errorMessage: error.message,
        },
        error.status || 500,
      );
    }
  }

  async executeById(id: string): Promise<OrganizacionResponse> {
    try {
      const organizacion = await this.organizacionRepository.obtenerPorId(id);

      if (!organizacion) {
        throw new NotFoundException(`Organizacion con id ${id} no encontrada`);
      }

      return organizacionMapper(organizacion);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al obtener la organizacion',
          errorMessage: error.message,
        },
        error.status || 500,
      );
    }
  }
}
