import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { MensajeErrorResponse } from '../interfaces/mensaje-error-response.interface';
import { MensajeErrorRepository } from '../mensaje-error.repository';
import { ActualizarMensajeErrorDto } from '../dtos';
import { mensajeErrorMapper } from '../mappers/mensaje-error.mapper';

@Injectable()
export class ActualizarMensajeErrorUseCase {
  constructor(private readonly repository: MensajeErrorRepository) {}

  async execute(id: string, dto: ActualizarMensajeErrorDto): Promise<MensajeErrorResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Mensaje de error con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.categoriaErrorId !== undefined) datosActualizar.categoriaErrorId = dto.categoriaErrorId;
      if (dto.mensajePlantilla !== undefined) datosActualizar.mensajePlantilla = dto.mensajePlantilla;
      if (dto.severidad !== undefined) datosActualizar.severidad = dto.severidad;
      if (dto.codigoHttpSugerido !== undefined) datosActualizar.codigoHttpSugerido = dto.codigoHttpSugerido;
      if (dto.esRecuperable !== undefined) datosActualizar.esRecuperable = dto.esRecuperable;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el mensaje de error');

      return mensajeErrorMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el mensaje de error', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
