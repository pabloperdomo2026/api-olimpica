import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ParametroGlobalResponse } from '../interfaces/parametro-global-response.interface';
import { ParametrosGlobalesRepository } from '../parametros-globales.repository';
import { ActualizarParametroGlobalDto } from '../dtos';
import { parametroGlobalMapper } from '../mappers/parametro-global.mapper';

@Injectable()
export class EditarParametroGlobalUseCase {
  constructor(private readonly repository: ParametrosGlobalesRepository) {}

  async execute(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
    dto: ActualizarParametroGlobalDto,
  ): Promise<ParametroGlobalResponse> {
    try {
      const existente = await this.repository.obtenerPorClave(
        organizacionId,
        itemGrupo,
        itemAtributo,
      );

      if (!existente) {
        throw new NotFoundException(
          `Parametro ${itemGrupo}.${itemAtributo} no encontrado`,
        );
      }

      const actualizado = await this.repository.actualizar(
        organizacionId,
        itemGrupo,
        itemAtributo,
        {
          itemDescripcion: dto.itemDescripcion,
          valorRetornar: dto.valorRetornar,
          esDefecto: dto.esDefecto,
          usuarioModificacion: 'admin@olimpica.com',
        },
      );

      if (!actualizado) {
        throw new BadRequestException('Error al actualizar el parametro');
      }

      return parametroGlobalMapper(actualizado);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al editar el parametro global',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
