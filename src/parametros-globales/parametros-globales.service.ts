import { Injectable } from '@nestjs/common';
import { CrearParametroGlobalUseCase } from './casos-de-uso/crear-parametro-global.use-case';
import { ListarParametrosGlobalesUseCase } from './casos-de-uso/listar-parametros-globales.use-case';
import { EditarParametroGlobalUseCase } from './casos-de-uso/editar-parametro-global.use-case';
import { EliminarParametroGlobalUseCase, EliminarParametroGlobalResponse } from './casos-de-uso/eliminar-parametro-global.use-case';
import { CrearParametroGlobalDto, ActualizarParametroGlobalDto } from './dtos';
import { ParametroGlobalResponse } from './interfaces/parametro-global-response.interface';

@Injectable()
export class ParametrosGlobalesService {
  constructor(
    private readonly crearUseCase: CrearParametroGlobalUseCase,
    private readonly listarUseCase: ListarParametrosGlobalesUseCase,
    private readonly editarUseCase: EditarParametroGlobalUseCase,
    private readonly eliminarUseCase: EliminarParametroGlobalUseCase,
  ) {}

  async crear(dto: CrearParametroGlobalDto): Promise<ParametroGlobalResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<ParametroGlobalResponse[]> {
    return this.listarUseCase.execute();
  }

  async listarPorOrganizacion(organizacionId: string): Promise<ParametroGlobalResponse[]> {
    return this.listarUseCase.executePorOrganizacion(organizacionId);
  }

  async obtenerPorClave(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
  ): Promise<ParametroGlobalResponse> {
    return this.listarUseCase.executePorClave(organizacionId, itemGrupo, itemAtributo);
  }

  async editar(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
    dto: ActualizarParametroGlobalDto,
  ): Promise<ParametroGlobalResponse> {
    return this.editarUseCase.execute(organizacionId, itemGrupo, itemAtributo, dto);
  }

  async eliminar(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
  ): Promise<EliminarParametroGlobalResponse> {
    return this.eliminarUseCase.execute(organizacionId, itemGrupo, itemAtributo);
  }
}
