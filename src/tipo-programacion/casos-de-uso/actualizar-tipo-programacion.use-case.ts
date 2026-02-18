import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoProgramacionResponse } from '../interfaces/tipo-programacion-response.interface';
import { TipoProgramacionRepository } from '../tipo-programacion.repository';
import { ActualizarTipoProgramacionDto } from '../dtos';
import { tipoProgramacionMapper } from '../mappers/tipo-programacion.mapper';

@Injectable()
export class ActualizarTipoProgramacionUseCase {
  constructor(private readonly repository: TipoProgramacionRepository) {}

  async execute(id: string, dto: ActualizarTipoProgramacionDto): Promise<TipoProgramacionResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de programacion con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.requiereCron !== undefined) datosActualizar.requiereCron = dto.requiereCron;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el tipo de programacion');

      return tipoProgramacionMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el tipo de programacion', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
