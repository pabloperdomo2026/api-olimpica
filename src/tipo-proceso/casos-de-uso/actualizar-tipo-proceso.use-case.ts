import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoProcesoResponse } from '../interfaces/tipo-proceso-response.interface';
import { TipoProcesoRepository } from '../tipo-proceso.repository';
import { ActualizarTipoProcesoDto } from '../dtos';
import { tipoProcesoMapper } from '../mappers/tipo-proceso.mapper';

@Injectable()
export class ActualizarTipoProcesoUseCase {
  constructor(private readonly repository: TipoProcesoRepository) {}

  async execute(id: string, dto: ActualizarTipoProcesoDto): Promise<TipoProcesoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de proceso con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.descripcion !== undefined) datosActualizar.descripcion = dto.descripcion;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el tipo de proceso');

      return tipoProcesoMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el tipo de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
