import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FuenteDatosResponse } from '../interfaces/fuente-datos-response.interface';
import { FuenteDatosRepository } from '../fuente-datos.repository';
import { CrearFuenteDatosDto } from '../dtos';
import { fuenteDatosMapper } from '../mappers/fuente-datos.mapper';

@Injectable()
export class CrearFuenteDatosUseCase {
  constructor(private readonly repository: FuenteDatosRepository) {}

  async execute(dto: CrearFuenteDatosDto): Promise<FuenteDatosResponse> {
    try {
      const existente = await this.repository.obtenerPorCodigo(dto.codigo.toUpperCase());
      if (existente) {
        throw new HttpException(
          { description: 'Ya existe una fuente de datos con ese código', errorMessage: `El código '${dto.codigo}' ya está en uso` },
          HttpStatus.CONFLICT,
        );
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo.toUpperCase(),
        nombre: dto.nombre,
        organizacionId: dto.organizacionId,
        tipoFuenteId: dto.tipoFuenteId,
        host: dto.host || undefined,
        puerto: dto.puerto ?? undefined,
        nombreBaseDatos: dto.nombreBaseDatos || undefined,
        usuario: dto.usuario || undefined,
        passwordEncriptado: dto.password || undefined,
        parametrosJson: dto.parametrosJson || undefined,
        tiempoRetencion: dto.tiempoRetencion,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return fuenteDatosMapper(creado);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al crear la fuente de datos', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
