import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { DestinoDatosResponse } from '../interfaces/destino-datos-response.interface';
import { DestinoDatosRepository } from '../destino-datos.repository';
import { ActualizarDestinoDatosDto } from '../dtos';
import { destinoDatosMapper } from '../mappers/destino-datos.mapper';

@Injectable()
export class ActualizarDestinoDatosUseCase {
  constructor(private readonly repository: DestinoDatosRepository) {}

  async execute(id: string, dto: ActualizarDestinoDatosDto): Promise<DestinoDatosResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Destino de datos con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.tipoDestinoId !== undefined) datosActualizar.tipoDestinoId = dto.tipoDestinoId;
      if (dto.tipoDestino !== undefined) datosActualizar.tipoDestino = dto.tipoDestino;
      if (dto.endpointApi !== undefined) datosActualizar.endpointApi = dto.endpointApi;
      if (dto.apiKey !== undefined) datosActualizar.apiKeyEncriptado = dto.apiKey;
      if (dto.password !== undefined) datosActualizar.passwordEncriptado = dto.password;
      if (dto.tamanoLoteRegistros !== undefined) datosActualizar.tamanoLoteRegistros = dto.tamanoLoteRegistros;
      if (dto.parametrosJson !== undefined) datosActualizar.parametrosJson = dto.parametrosJson;
      if (dto.tiempoRetencion !== undefined) datosActualizar.tiempoRetencion = dto.tiempoRetencion;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el destino de datos');

      return destinoDatosMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el destino de datos', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
