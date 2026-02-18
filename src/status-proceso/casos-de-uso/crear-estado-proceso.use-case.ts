import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { EstadoProcesoResponse } from '../interfaces/estado-proceso-response.interface';
import { EstadoProcesoRepository } from '../estado-proceso.repository';
import { CrearEstadoProcesoDto } from '../dtos';
import { estadoProcesoMapper } from '../mappers/estado-proceso.mapper';

@Injectable()
export class CrearEstadoProcesoUseCase {
  constructor(private readonly repository: EstadoProcesoRepository) {}

  async execute(dto: CrearEstadoProcesoDto): Promise<EstadoProcesoResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        esInicial: dto.esInicial ?? false,
        esFinal: dto.esFinal ?? false,
        esExitoso: dto.esExitoso ?? false,
        esError: dto.esError ?? false,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
        usuarioModificacion: 'admin@olimpica.com',
      });

      return estadoProcesoMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el estado de proceso', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
