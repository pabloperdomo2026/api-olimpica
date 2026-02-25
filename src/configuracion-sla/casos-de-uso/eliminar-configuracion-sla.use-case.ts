import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfiguracionSlaRepository } from '../configuracion-sla.repository';

export interface EliminarConfiguracionSlaResponse {
  mensaje: string;
}

@Injectable()
export class EliminarConfiguracionSlaUseCase {
  constructor(private readonly repository: ConfiguracionSlaRepository) {}

  async execute(id: string): Promise<EliminarConfiguracionSlaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Configuracion de SLA con id ${id} no encontrada`);

      await this.repository.eliminar(id);
      return { mensaje: 'Configuracion de SLA eliminada correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        { description: 'Error al eliminar configuracion de SLA', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
