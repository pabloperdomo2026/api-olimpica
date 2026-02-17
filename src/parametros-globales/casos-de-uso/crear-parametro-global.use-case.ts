import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { ParametroGlobalResponse } from '../interfaces/parametro-global-response.interface';
import { ParametrosGlobalesRepository } from '../parametros-globales.repository';
import { CrearParametroGlobalDto } from '../dtos';
import { parametroGlobalMapper } from '../mappers/parametro-global.mapper';

@Injectable()
export class CrearParametroGlobalUseCase {
  constructor(private readonly repository: ParametrosGlobalesRepository) {}

  async execute(dto: CrearParametroGlobalDto): Promise<ParametroGlobalResponse> {
    try {
      const existe = await this.repository.obtenerPorClave(
        dto.organizacionId,
        dto.itemGrupo,
        dto.itemAtributo,
      );

      if (existe) {
        throw new ConflictException(
          `El parametro ${dto.itemGrupo}.${dto.itemAtributo} ya existe para esta organizacion`,
        );
      }

      const creado = await this.repository.crear({
        organizacionId: dto.organizacionId,
        itemGrupo: dto.itemGrupo,
        itemAtributo: dto.itemAtributo,
        itemDescripcion: dto.itemDescripcion,
        valorRetornar: dto.valorRetornar,
        esDefecto: dto.esDefecto ?? false,
        usuarioCreacion: 'admin@olimpica.com',
      });

      return parametroGlobalMapper(creado);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al crear el parametro global',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
