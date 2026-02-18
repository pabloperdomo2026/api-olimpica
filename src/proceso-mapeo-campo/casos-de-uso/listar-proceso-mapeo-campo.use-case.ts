import { Injectable, HttpException } from '@nestjs/common';
import { ProcesoMapeoCampoResponse } from '../interfaces/proceso-mapeo-campo-response.interface';
import { ProcesoMapeoCampoRepository } from '../proceso-mapeo-campo.repository';
import { procesoMapeoCampoMapper } from '../mappers/proceso-mapeo-campo.mapper';

@Injectable()
export class ListarProcesoMapeoCampoUseCase {
  constructor(private readonly repository: ProcesoMapeoCampoRepository) {}

  async execute(procesoId?: string): Promise<ProcesoMapeoCampoResponse[]> {
    try {
      const registros = procesoId
        ? await this.repository.listarPorProceso(procesoId)
        : await this.repository.listarTodos();

      return registros.map(procesoMapeoCampoMapper);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al listar los mapeos de campo',
          errorMessage: error.response ?? error.message,
        },
        error.status || 500,
      );
    }
  }
}
