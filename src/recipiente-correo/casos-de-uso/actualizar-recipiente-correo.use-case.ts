import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RecipienteCorreoRepository } from '../recipiente-correo.repository';
import { ActualizarRecipienteCorreoDto } from '../dtos';
import { RecipienteCorreoResponse } from '../interfaces/recipiente-correo-response.interface';
import { recipienteCorreoMapper } from '../mappers/recipiente-correo.mapper';

@Injectable()
export class ActualizarRecipienteCorreoUseCase {
  constructor(private readonly repository: RecipienteCorreoRepository) {}

  async execute(id: string, dto: ActualizarRecipienteCorreoDto): Promise<RecipienteCorreoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Recipiente de correo con id ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.descripcion !== undefined) datosActualizar.descripcion = dto.descripcion;
      if (dto.tipoRecipiente !== undefined) datosActualizar.tipoRecipiente = dto.tipoRecipiente;
      if (dto.arnSns !== undefined) datosActualizar.arnSns = dto.arnSns;
      if (dto.arnSqs !== undefined) datosActualizar.arnSqs = dto.arnSqs;
      if (dto.emailsDestino !== undefined) datosActualizar.emailsDestino = dto.emailsDestino;
      if (dto.regionAws !== undefined) datosActualizar.regionAws = dto.regionAws;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';

      const actualizado = await this.repository.actualizar(id, datosActualizar as any);
      if (!actualizado) throw new HttpException(
        { description: 'No se pudo recuperar el registro actualizado' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      return recipienteCorreoMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el recipiente de correo', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
