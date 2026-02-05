import { Injectable } from '@nestjs/common';
import { CrearRolUseCase } from './casos-de-uso/crear-rol.use-case';
import { ListarRolesUseCase } from './casos-de-uso/listar-roles.use-case';
import { EditarRolUseCase } from './casos-de-uso/editar-rol.use-case';
import { EliminarRolUseCase, EliminarRolResponse } from './casos-de-uso/eliminar-rol.use-case';
import { CrearRolDto, ActualizarRolDto } from './dtos';
import { RolResponse } from './interfaces/rol-response.interface';

@Injectable()
export class RolService {
  constructor(
    private readonly crearRolUseCase: CrearRolUseCase,
    private readonly listarRolesUseCase: ListarRolesUseCase,
    private readonly editarRolUseCase: EditarRolUseCase,
    private readonly eliminarRolUseCase: EliminarRolUseCase,
  ) {}

  async crear(dto: CrearRolDto): Promise<RolResponse> {
    return this.crearRolUseCase.execute(dto);
  }

  async listarTodos(): Promise<RolResponse[]> {
    return this.listarRolesUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<RolResponse> {
    return this.listarRolesUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarRolDto): Promise<RolResponse> {
    return this.editarRolUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarRolResponse> {
    return this.eliminarRolUseCase.execute(id);
  }
}
