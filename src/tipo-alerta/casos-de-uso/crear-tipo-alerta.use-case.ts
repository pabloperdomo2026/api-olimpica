import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoAlertaResponse } from '../interfaces/tipo-alerta-response.interface';
import { TipoAlertaRepository } from '../tipo-alerta.repository';
import { CrearTipoAlertaDto } from '../dtos';
import { tipoAlertaMapper } from '../mappers/tipo-alerta.mapper';

@Injectable()
export class CrearTipoAlertaUseCase {
  constructor(private readonly repository: TipoAlertaRepository) {}

  async execute(dto: CrearTipoAlertaDto): Promise<TipoAlertaResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        severidad: dto.severidad || undefined,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return tipoAlertaMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el tipo de alerta', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
