import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RecipienteCorreoRepository } from '../recipiente-correo.repository';
import { RecipienteCorreoResponse } from '../interfaces/recipiente-correo-response.interface';
import { recipienteCorreoMapper } from '../mappers/recipiente-correo.mapper';

@Injectable()
export class ListarRecipienteCorreoUseCase {
  constructor(private readonly repository: RecipienteCorreoRepository) {}

  async execute(): Promise<RecipienteCorreoResponse[]> {
    try {
      const lista = await this.repository.listarTodos();
      return lista.map(recipienteCorreoMapper);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al listar recipientes de correo', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<RecipienteCorreoResponse> {
    const entidad = await this.repository.obtenerPorId(id);
    if (!entidad) throw new NotFoundException(`Recipiente de correo con id ${id} no encontrado`);
    return recipienteCorreoMapper(entidad);
  }
}
