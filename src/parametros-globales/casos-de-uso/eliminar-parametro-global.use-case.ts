import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ParametrosGlobalesRepository } from '../parametros-globales.repository';

export interface EliminarParametroGlobalResponse {
  mensaje: string;
}

@Injectable()
export class EliminarParametroGlobalUseCase {
  constructor(private readonly repository: ParametrosGlobalesRepository) {}

  async execute(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
  ): Promise<EliminarParametroGlobalResponse> {
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

      await this.repository.eliminar(organizacionId, itemGrupo, itemAtributo);

      return {
        mensaje: `Parametro ${itemGrupo}.${itemAtributo} eliminado correctamente`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al eliminar el parametro global',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
