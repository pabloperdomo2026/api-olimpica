import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FuenteDatosResponse } from '../interfaces/fuente-datos-response.interface';
import { FuenteDatosRepository } from '../fuente-datos.repository';
import { ActualizarFuenteDatosDto } from '../dtos';
import { fuenteDatosMapper } from '../mappers/fuente-datos.mapper';

@Injectable()
export class ActualizarFuenteDatosUseCase {
  constructor(private readonly repository: FuenteDatosRepository) {}

  async execute(id: string, dto: ActualizarFuenteDatosDto): Promise<FuenteDatosResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) {
        throw new HttpException(
          { description: 'Fuente de datos no encontrada', errorMessage: `No existe una fuente de datos con id '${id}'` },
          HttpStatus.NOT_FOUND,
        );
      }

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.tipoFuenteId !== undefined) datosActualizar.tipoFuenteId = dto.tipoFuenteId;
      if (dto.host !== undefined) datosActualizar.host = dto.host;
      if (dto.puerto !== undefined) datosActualizar.puerto = dto.puerto;
      if (dto.nombreBaseDatos !== undefined) datosActualizar.nombreBaseDatos = dto.nombreBaseDatos;
      if (dto.usuario !== undefined) datosActualizar.usuario = dto.usuario;
      if (dto.password !== undefined) datosActualizar.passwordEncriptado = dto.password;
      if (dto.parametrosJson !== undefined) datosActualizar.parametrosJson = dto.parametrosJson;
      if (dto.tiempoRetencion !== undefined) datosActualizar.tiempoRetencion = dto.tiempoRetencion;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar as any);
      if (!actualizado) {
        throw new HttpException(
          { description: 'Error al actualizar la fuente de datos', errorMessage: 'No se pudo recuperar el registro actualizado' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return fuenteDatosMapper(actualizado);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar la fuente de datos', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
