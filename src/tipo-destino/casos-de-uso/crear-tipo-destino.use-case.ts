import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { TipoDestinoResponse } from '../interfaces/tipo-destino-response.interface';
import { TipoDestinoRepository } from '../tipo-destino.repository';
import { CrearTipoDestinoDto } from '../dtos';
import { tipoDestinoMapper } from '../mappers/tipo-destino.mapper';

@Injectable()
export class CrearTipoDestinoUseCase {
  constructor(private readonly repository: TipoDestinoRepository) {}

  async execute(dto: CrearTipoDestinoDto): Promise<TipoDestinoResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        descripcion: dto.descripcion || undefined,
        categoria: dto.categoria || undefined,
        requiereCredenciales: dto.requiereCredenciales ?? false,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return tipoDestinoMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el tipo de destino', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
