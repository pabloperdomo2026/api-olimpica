import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { MensajeErrorResponse } from '../interfaces/mensaje-error-response.interface';
import { MensajeErrorRepository } from '../mensaje-error.repository';
import { CrearMensajeErrorDto } from '../dtos';
import { mensajeErrorMapper } from '../mappers/mensaje-error.mapper';

@Injectable()
export class CrearMensajeErrorUseCase {
  constructor(private readonly repository: MensajeErrorRepository) {}

  async execute(dto: CrearMensajeErrorDto): Promise<MensajeErrorResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigoError);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigoError} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigoError: dto.codigoError,
        nombre: dto.nombre,
        categoriaErrorId: dto.categoriaErrorId || undefined,
        mensajePlantilla: dto.mensajePlantilla || undefined,
        severidad: dto.severidad || undefined,
        codigoHttpSugerido: dto.codigoHttpSugerido || undefined,
        esRecuperable: dto.esRecuperable ?? false,
        activo: 'S',
      });

      return mensajeErrorMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el mensaje de error', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
