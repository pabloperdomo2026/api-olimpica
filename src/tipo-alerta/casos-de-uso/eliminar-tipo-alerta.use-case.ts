import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoAlertaRepository } from '../tipo-alerta.repository';

export interface EliminarTipoAlertaResponse {
  mensaje: string;
}

@Injectable()
export class EliminarTipoAlertaUseCase {
  constructor(private readonly repository: TipoAlertaRepository) {}

  async execute(id: string): Promise<EliminarTipoAlertaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de alerta con ID ${id} no encontrado`);

      await this.repository.eliminar(id);
      return { mensaje: `Tipo de alerta ${existente.nombre} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar el tipo de alerta', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
