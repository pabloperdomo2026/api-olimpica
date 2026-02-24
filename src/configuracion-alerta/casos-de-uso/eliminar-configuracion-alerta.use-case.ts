import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfiguracionAlertaRepository } from '../configuracion-alerta.repository';

export interface EliminarConfiguracionAlertaResponse {
  mensaje: string;
}

@Injectable()
export class EliminarConfiguracionAlertaUseCase {
  constructor(private readonly repository: ConfiguracionAlertaRepository) {}

  async execute(id: string): Promise<EliminarConfiguracionAlertaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Configuracion de alerta con id ${id} no encontrada`);

      await this.repository.eliminar(id);
      return { mensaje: 'Configuracion de alerta eliminada correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar configuracion de alerta', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
