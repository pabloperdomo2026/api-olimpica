import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfiguracionAlertaRepository } from '../configuracion-alerta.repository';
import { ConfiguracionAlertaResponse } from '../interfaces/configuracion-alerta-response.interface';
import { configuracionAlertaMapper } from '../mappers/configuracion-alerta.mapper';

@Injectable()
export class ListarConfiguracionAlertaUseCase {
  constructor(private readonly repository: ConfiguracionAlertaRepository) {}

  async execute(): Promise<ConfiguracionAlertaResponse[]> {
    try {
      const lista = await this.repository.listarTodos();
      return lista.map(configuracionAlertaMapper);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al listar configuraciones de alerta', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<ConfiguracionAlertaResponse> {
    try {
      const entidad = await this.repository.obtenerPorId(id);
      if (!entidad) throw new NotFoundException(`Configuracion de alerta con id ${id} no encontrada`);
      return configuracionAlertaMapper(entidad);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener configuracion de alerta', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
