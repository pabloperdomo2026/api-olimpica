import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfiguracionAlertaRepository } from '../configuracion-alerta.repository';
import { ActualizarConfiguracionAlertaDto } from '../dtos';
import { ConfiguracionAlertaResponse } from '../interfaces/configuracion-alerta-response.interface';
import { configuracionAlertaMapper } from '../mappers/configuracion-alerta.mapper';

@Injectable()
export class ActualizarConfiguracionAlertaUseCase {
  constructor(private readonly repository: ConfiguracionAlertaRepository) {}

  async execute(id: string, dto: ActualizarConfiguracionAlertaDto): Promise<ConfiguracionAlertaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Configuracion de alerta con id ${id} no encontrada`);

      const datos: Record<string, unknown> = {};
      if (dto.tipoAlertaId !== undefined) datos.tipoAlertaId = dto.tipoAlertaId;
      if (dto.procesoId !== undefined) datos.procesoId = dto.procesoId;
      if (dto.recipienteId !== undefined) datos.recipienteId = dto.recipienteId;
      if (dto.nombre !== undefined) datos.nombre = dto.nombre;
      if (dto.templateMensaje !== undefined) datos.templateMensaje = dto.templateMensaje;
      if (dto.condicionDisparo !== undefined) datos.condicionDisparo = dto.condicionDisparo;
      if (dto.tiempoEvaluacion !== undefined) datos.tiempoEvaluacion = dto.tiempoEvaluacion;
      if (dto.umbralValor !== undefined) datos.umbralValor = dto.umbralValor;
      if (dto.activo !== undefined) datos.activo = dto.activo ? 'S' : 'N';

      const actualizado = await this.repository.actualizar(id, datos as any);
      if (!actualizado) throw new HttpException(
        { description: 'No se pudo recuperar el registro actualizado' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      return configuracionAlertaMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar configuracion de alerta', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
