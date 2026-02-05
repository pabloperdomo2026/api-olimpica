import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ProcesoResponse } from '../interfaces/proceso-response.interface';
import { ProcesoRepository } from '../proceso.repository';
import { listarProcesosMapper, procesoMapper } from '../mappers/proceso.mapper';

@Injectable()
export class ListarProcesosUseCase {
  constructor(private readonly procesoRepository: ProcesoRepository) {}

  async execute(organizacionId?: string): Promise<ProcesoResponse[]> {
    try {
      let procesos;

      if (organizacionId) {
        procesos = await this.procesoRepository.listarPorOrganizacion(organizacionId);
      } else {
        procesos = await this.procesoRepository.listarTodos();
      }

      return listarProcesosMapper(procesos);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener los procesos',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }

  async executeById(id: string): Promise<ProcesoResponse> {
    try {
      const proceso = await this.procesoRepository.obtenerPorId(id);

      if (!proceso) {
        throw new NotFoundException(`Proceso con id ${id} no encontrado`);
      }

      return procesoMapper(proceso);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener el proceso',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
