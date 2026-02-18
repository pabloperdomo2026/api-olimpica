import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDatoResponse } from '../interfaces/tipo-dato-response.interface';
import { TipoDatoRepository } from '../tipo-dato.repository';
import { ActualizarTipoDatoDto } from '../dtos';
import { tipoDatoMapper } from '../mappers/tipo-dato.mapper';

@Injectable()
export class ActualizarTipoDatoUseCase {
  constructor(private readonly repository: TipoDatoRepository) {}

  async execute(id: string, dto: ActualizarTipoDatoDto): Promise<TipoDatoResponse> {
    try {
      const existente = await this.repository.obtenerPorId(id);
      if (!existente) throw new NotFoundException(`Tipo de dato con ID ${id} no encontrado`);

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.tipoSql !== undefined) datosActualizar.tipoSql = dto.tipoSql;
      if (dto.tipoPython !== undefined) datosActualizar.tipoPython = dto.tipoPython;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';
      datosActualizar.usuarioModificacion = 'admin@olimpica.com';

      const actualizado = await this.repository.actualizar(id, datosActualizar);
      if (!actualizado) throw new BadRequestException('Error al actualizar el tipo de dato');

      return tipoDatoMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      throw new HttpException(
        { description: 'Error al actualizar el tipo de dato', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
