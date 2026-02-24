import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfiguracionAlertaRepository } from '../configuracion-alerta.repository';
import { CrearConfiguracionAlertaDto } from '../dtos';
import { ConfiguracionAlertaResponse } from '../interfaces/configuracion-alerta-response.interface';
import { configuracionAlertaMapper } from '../mappers/configuracion-alerta.mapper';

@Injectable()
export class CrearConfiguracionAlertaUseCase {
  constructor(private readonly repository: ConfiguracionAlertaRepository) {}

  async execute(dto: CrearConfiguracionAlertaDto): Promise<ConfiguracionAlertaResponse> {
    try {
      const creado = await this.repository.crear({
        tipoAlertaId: dto.tipoAlertaId,
        procesoId: dto.procesoId,
        recipienteId: dto.recipienteId,
        nombre: dto.nombre,
        templateMensaje: dto.templateMensaje,
        condicionDisparo: dto.condicionDisparo,
        tiempoEvaluacion: dto.tiempoEvaluacion,
        umbralValor: dto.umbralValor,
        activo: 'S',
      });
      return configuracionAlertaMapper(creado);
    } catch (error) {
      throw new HttpException(
        { description: 'Error al crear configuracion de alerta', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
