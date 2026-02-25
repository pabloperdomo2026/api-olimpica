import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfiguracionSlaRepository } from '../configuracion-sla.repository';
import { ConfiguracionSlaResponse } from '../interfaces/configuracion-sla-response.interface';
import { configuracionSlaMapper } from '../mappers/configuracion-sla.mapper';

@Injectable()
export class ListarConfiguracionSlaUseCase {
  constructor(private readonly repository: ConfiguracionSlaRepository) {}

  async execute(): Promise<ConfiguracionSlaResponse[]> {
    try {
      const lista = await this.repository.listarTodos();
      return lista.map(configuracionSlaMapper);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al listar configuraciones de SLA', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<ConfiguracionSlaResponse> {
    try {
      const entidad = await this.repository.obtenerPorId(id);
      if (!entidad) throw new NotFoundException(`Configuracion de SLA con id ${id} no encontrada`);
      return configuracionSlaMapper(entidad);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener configuracion de SLA', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
