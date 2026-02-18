import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { FuncionesSistemaResponse } from '../interfaces/funciones-sistema-response.interface';
import { FuncionesSistemaRepository } from '../funciones-sistema.repository';
import { listarFuncionesSistemaMapper, funcionSistemaMapper } from '../mappers/funciones-sistema.mapper';

@Injectable()
export class ListarFuncionesSistemaUseCase {
  constructor(private readonly repository: FuncionesSistemaRepository) {}

  async execute(): Promise<FuncionesSistemaResponse[]> {
    try {
      const items = await this.repository.listarTodos();
      return listarFuncionesSistemaMapper(items);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener las funciones del sistema', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executeById(id: string): Promise<FuncionesSistemaResponse> {
    try {
      const item = await this.repository.obtenerPorId(id);
      if (!item) throw new NotFoundException(`Funcion del sistema con ID ${id} no encontrada`);
      return funcionSistemaMapper(item);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al obtener la funcion del sistema', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
