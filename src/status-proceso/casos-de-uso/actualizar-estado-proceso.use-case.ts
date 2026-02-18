import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { EstadoProcesoResponse } from '../interfaces/estado-proceso-response.interface';
import { EstadoProcesoRepository } from '../estado-proceso.repository';
import { ActualizarEstadoProcesoDto } from '../dtos';
import { estadoProcesoMapper } from '../mappers/estado-proceso.mapper';

@Injectable()
export class ActualizarEstadoProcesoUseCase {
  constructor(private readonly repository: EstadoProcesoRepository) {}

  async execute(id: string, dto: ActualizarEstadoProcesoDto): Promise<EstadoProcesoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Estado de proceso con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.esInicial !== undefined) datosActualizar.esInicial = dto.esInicial;
      if (dto.esFinal !== undefined) datosActualizar.esFinal = dto.esFinal;
      if (dto.esExitoso !== undefined) datosActualizar.esExitoso = dto.esExitoso;
      if (dto.esError !== undefined) datosActualizar.esError = dto.esError;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el estado de proceso');

      return estadoProcesoMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el estado de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
