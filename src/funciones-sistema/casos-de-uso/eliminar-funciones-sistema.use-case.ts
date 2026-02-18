import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { FuncionesSistemaRepository } from '../funciones-sistema.repository';

export interface EliminarFuncionesSistemaResponse {
  mensaje: string;
}

@Injectable()
export class EliminarFuncionesSistemaUseCase {
  constructor(private readonly repository: FuncionesSistemaRepository) {}

  async execute(id: string): Promise<EliminarFuncionesSistemaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Funcion del sistema con ID ${id} no encontrada`);

      await this.repository.eliminar(id);
      return { mensaje: `Funcion del sistema ${existente.nombre} eliminada correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar la funcion del sistema', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
