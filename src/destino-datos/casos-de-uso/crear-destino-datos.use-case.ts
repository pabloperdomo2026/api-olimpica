import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { DestinoDatosResponse } from '../interfaces/destino-datos-response.interface';
import { DestinoDatosRepository } from '../destino-datos.repository';
import { CrearDestinoDatosDto } from '../dtos';
import { destinoDatosMapper } from '../mappers/destino-datos.mapper';

@Injectable()
export class CrearDestinoDatosUseCase {
  constructor(private readonly repository: DestinoDatosRepository) {}

  async execute(dto: CrearDestinoDatosDto): Promise<DestinoDatosResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        organizacionId: dto.organizacionId,
        tipoDestinoId: dto.tipoDestinoId,
        tipoDestino: dto.tipoDestino || undefined,
        endpointApi: dto.endpointApi || undefined,
        apiKeyEncriptado: dto.apiKey || undefined,
        passwordEncriptado: dto.password || undefined,
        tamanoLoteRegistros: dto.tamanoLoteRegistros ?? 350,
        parametrosJson: dto.parametrosJson || undefined,
        tiempoRetencion: dto.tiempoRetencion,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return destinoDatosMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el destino de datos', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
