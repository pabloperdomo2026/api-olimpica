import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoFuenteResponse } from '../interfaces/tipo-fuente-response.interface';
import { TipoFuenteRepository } from '../tipo-fuente.repository';
import { ActualizarTipoFuenteDto } from '../dtos';
import { tipoFuenteMapper } from '../mappers/tipo-fuente.mapper';

@Injectable()
export class ActualizarTipoFuenteUseCase {
  constructor(private readonly repository: TipoFuenteRepository) {}

  async execute(id: string, dto: ActualizarTipoFuenteDto): Promise<TipoFuenteResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de fuente con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.descripcion !== undefined) datosActualizar.descripcion = dto.descripcion;
      if (dto.categoria !== undefined) datosActualizar.categoria = dto.categoria;
      if (dto.requiereCredenciales !== undefined) datosActualizar.requiereCredenciales = dto.requiereCredenciales;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el tipo de fuente');

      return tipoFuenteMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el tipo de fuente', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
