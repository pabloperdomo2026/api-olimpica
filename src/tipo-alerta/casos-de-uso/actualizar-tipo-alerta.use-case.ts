import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoAlertaResponse } from '../interfaces/tipo-alerta-response.interface';
import { TipoAlertaRepository } from '../tipo-alerta.repository';
import { ActualizarTipoAlertaDto } from '../dtos';
import { tipoAlertaMapper } from '../mappers/tipo-alerta.mapper';

@Injectable()
export class ActualizarTipoAlertaUseCase {
  constructor(private readonly repository: TipoAlertaRepository) {}

  async execute(id: string, dto: ActualizarTipoAlertaDto): Promise<TipoAlertaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de alerta con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.severidad !== undefined) datosActualizar.severidad = dto.severidad;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el tipo de alerta');

      return tipoAlertaMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el tipo de alerta', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
