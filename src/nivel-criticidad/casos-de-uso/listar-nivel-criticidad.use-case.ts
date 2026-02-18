import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { NivelCriticidadResponse } from '../interfaces/nivel-criticidad-response.interface';
import { NivelCriticidadRepository } from '../nivel-criticidad.repository';
import { listarNivelesCriticidadMapper, nivelCriticidadMapper } from '../mappers/nivel-criticidad.mapper';

@Injectable()
export class ListarNivelCriticidadUseCase {
  constructor(private readonly repository: NivelCriticidadRepository) {}

  async execute(): Promise<NivelCriticidadResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarNivelesCriticidadMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener los niveles de criticidad', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<NivelCriticidadResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Nivel de criticidad con ID ${id} no encontrado`);
      return nivelCriticidadMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener el nivel de criticidad', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
