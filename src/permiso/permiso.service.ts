import { Injectable } from '@nestjs/common';
import { CrearPermisoUseCase } from './casos-de-uso/crear-permiso.use-case';
import { ListarPermisosUseCase } from './casos-de-uso/listar-permisos.use-case';
import { EditarPermisoUseCase } from './casos-de-uso/editar-permiso.use-case';
import { EliminarPermisoUseCase, EliminarPermisoResponse } from './casos-de-uso/eliminar-permiso.use-case';
import { CrearPermisoDto, ActualizarPermisoDto } from './dtos';
import { PermisoResponse } from './interfaces/permiso-response.interface';

@Injectable()
export class PermisoService {
  constructor(
    private readonly crearPermisoUseCase: CrearPermisoUseCase,
    private readonly listarPermisosUseCase: ListarPermisosUseCase,
    private readonly editarPermisoUseCase: EditarPermisoUseCase,
    private readonly eliminarPermisoUseCase: EliminarPermisoUseCase,
  ) {}

  async crear(dto: CrearPermisoDto): Promise<PermisoResponse> {
    return this.crearPermisoUseCase.execute(dto);
  }

  async listarTodos(): Promise<PermisoResponse[]> {
    return this.listarPermisosUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<PermisoResponse> {
    return this.listarPermisosUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarPermisoDto): Promise<PermisoResponse> {
    return this.editarPermisoUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarPermisoResponse> {
    return this.eliminarPermisoUseCase.execute(id);
  }
}
