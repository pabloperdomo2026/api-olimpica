import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ParametroGlobalResponse } from '../interfaces/parametro-global-response.interface';
import { ParametrosGlobalesRepository } from '../parametros-globales.repository';
import { listarParametrosMapper, parametroGlobalMapper } from '../mappers/parametro-global.mapper';

@Injectable()
export class ListarParametrosGlobalesUseCase {
  constructor(private readonly repository: ParametrosGlobalesRepository) {}

  async execute(): Promise<ParametroGlobalResponse[]> {
    try {
      const parametros = await this.repository.listarTodos();
      return listarParametrosMapper(parametros);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener los parametros globales',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executePorOrganizacion(organizacionId: string): Promise<ParametroGlobalResponse[]> {
    try {
      const parametros = await this.repository.listarPorOrganizacion(organizacionId);
      return listarParametrosMapper(parametros);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener los parametros de la organizacion',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async executePorClave(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
  ): Promise<ParametroGlobalResponse> {
    try {
      const parametro = await this.repository.obtenerPorClave(
        organizacionId,
        itemGrupo,
        itemAtributo,
      );

      if (!parametro) {
        throw new NotFoundException(
          `Parametro ${itemGrupo}.${itemAtributo} no encontrado`,
        );
      }

      return parametroGlobalMapper(parametro);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al obtener el parametro global',
          errorMessage: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
