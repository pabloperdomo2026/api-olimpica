import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { NivelCriticidadRepository } from '../nivel-criticidad.repository';

export interface EliminarNivelCriticidadResponse {
  mensaje: string;
}

@Injectable()
export class EliminarNivelCriticidadUseCase {
  constructor(private readonly repository: NivelCriticidadRepository) {}

  async execute(id: string): Promise<EliminarNivelCriticidadResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Nivel de criticidad con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Nivel de criticidad ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el nivel de criticidad', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
