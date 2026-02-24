import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { RecipienteCorreoRepository } from '../recipiente-correo.repository';
import { CrearRecipienteCorreoDto } from '../dtos';
import { RecipienteCorreoResponse } from '../interfaces/recipiente-correo-response.interface';
import { recipienteCorreoMapper } from '../mappers/recipiente-correo.mapper';

@Injectable()
export class CrearRecipienteCorreoUseCase {
  constructor(private readonly repository: RecipienteCorreoRepository) {}

  async execute(dto: CrearRecipienteCorreoDto): Promise<RecipienteCorreoResponse> {
    try {
      const existe = await this.repository.obtenerPorCodigo(dto.codigo);
      if (existe) throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);

      const creado = await this.repository.crear({
        codigo: dto.codigo,
        nombre: dto.nombre,
        descripcion: dto.descripcion || undefined,
        tipoRecipiente: dto.tipoRecipiente || undefined,
        arnSns: dto.arnSns || undefined,
        arnSqs: dto.arnSqs || undefined,
        emailsDestino: dto.emailsDestino || undefined,
        regionAws: dto.regionAws || undefined,
        organizacionId: dto.organizacionId,
        activo: 'S',
        usuarioCreacion: 'admin@olimpica.com',
      });

      return recipienteCorreoMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new HttpException(
        { description: 'Error al crear el recipiente de correo', errorMessage: error.message },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
