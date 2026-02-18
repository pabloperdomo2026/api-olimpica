import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { NivelCriticidadResponse } from '../interfaces/nivel-criticidad-response.interface';
import { NivelCriticidadRepository } from '../nivel-criticidad.repository';
import { CrearNivelCriticidadDto } from '../dtos';
import { nivelCriticidadMapper } from '../mappers/nivel-criticidad.mapper';

@Injectable()
export class CrearNivelCriticidadUseCase {
  constructor(private readonly repository: NivelCriticidadRepository) {}

  async execute(dto: CrearNivelCriticidadDto): Promise<NivelCriticidadResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        nivelNumerico: dto.nivelNumerico,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
        usuarioModificacion: 'admin@olimpica.com',
      });

      return nivelCriticidadMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el nivel de criticidad', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
