import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { NivelCriticidadResponse } from '../interfaces/nivel-criticidad-response.interface';
import { NivelCriticidadRepository } from '../nivel-criticidad.repository';
import { ActualizarNivelCriticidadDto } from '../dtos';
import { nivelCriticidadMapper } from '../mappers/nivel-criticidad.mapper';

@Injectable()
export class ActualizarNivelCriticidadUseCase {
  constructor(private readonly repository: NivelCriticidadRepository) {}

  async execute(id: string, dto: ActualizarNivelCriticidadDto): Promise<NivelCriticidadResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Nivel de criticidad con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.nivelNumerico !== undefined) datosActualizar.nivelNumerico = dto.nivelNumerico;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el nivel de criticidad');

      return nivelCriticidadMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el nivel de criticidad', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
