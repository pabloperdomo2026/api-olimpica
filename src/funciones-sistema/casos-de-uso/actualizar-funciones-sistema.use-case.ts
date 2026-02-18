import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { FuncionesSistemaResponse } from '../interfaces/funciones-sistema-response.interface';
import { FuncionesSistemaRepository } from '../funciones-sistema.repository';
import { ActualizarFuncionesSistemaDto } from '../dtos';
import { funcionSistemaMapper } from '../mappers/funciones-sistema.mapper';

@Injectable()
export class ActualizarFuncionesSistemaUseCase {
  constructor(private readonly repository: FuncionesSistemaRepository) {}

  async execute(id: string, dto: ActualizarFuncionesSistemaDto): Promise<FuncionesSistemaResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Funcion del sistema con ID ${id} no encontrada`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.descripcion !== undefined) datosActualizar.descripcion = dto.descripcion;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar la funcion del sistema');

      return funcionSistemaMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar la funcion del sistema', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
