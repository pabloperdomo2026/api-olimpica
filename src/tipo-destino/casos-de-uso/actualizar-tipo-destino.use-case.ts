import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDestinoResponse } from '../interfaces/tipo-destino-response.interface';
import { TipoDestinoRepository } from '../tipo-destino.repository';
import { ActualizarTipoDestinoDto } from '../dtos';
import { tipoDestinoMapper } from '../mappers/tipo-destino.mapper';

@Injectable()
export class ActualizarTipoDestinoUseCase {
  constructor(private readonly repository: TipoDestinoRepository) {}

  async execute(id: string, dto: ActualizarTipoDestinoDto): Promise<TipoDestinoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de destino con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.descripcion !== undefined) datosActualizar.descripcion = dto.descripcion;
      if (dto.categoria !== undefined) datosActualizar.categoria = dto.categoria;
      if (dto.requiereCredenciales !== undefined) datosActualizar.requiereCredenciales = dto.requiereCredenciales;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el tipo de destino');

      return tipoDestinoMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el tipo de destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
