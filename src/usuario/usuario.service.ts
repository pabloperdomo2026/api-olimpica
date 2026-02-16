import { Injectable } from '@nestjs/common';
import { CrearUsuarioUseCase } from './casos-de-uso/crear-usuario.use-case';
import { ListarUsuariosUseCase } from './casos-de-uso/listar-usuarios.use-case';
import { EditarUsuarioUseCase } from './casos-de-uso/editar-usuario.use-case';
import { EliminarUsuarioUseCase, EliminarUsuarioResponse } from './casos-de-uso/eliminar-usuario.use-case';
import { CrearUsuarioDto, ActualizarUsuarioDto } from './dtos';
import { UsuarioResponse } from './interfaces/usuario-response.interface';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly crearUsuarioUseCase: CrearUsuarioUseCase,
    private readonly listarUsuariosUseCase: ListarUsuariosUseCase,
    private readonly editarUsuarioUseCase: EditarUsuarioUseCase,
    private readonly eliminarUsuarioUseCase: EliminarUsuarioUseCase,
  ) {}

  async crear(dto: CrearUsuarioDto): Promise<UsuarioResponse> {
    return this.crearUsuarioUseCase.execute(dto);
  }

  async listarTodos(organizacionId: string): Promise<UsuarioResponse[]> {
    return this.listarUsuariosUseCase.execute(organizacionId);
  }

  async editar(id: string, dto: ActualizarUsuarioDto): Promise<UsuarioResponse> {
    return this.editarUsuarioUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarUsuarioResponse> {
    return this.eliminarUsuarioUseCase.execute(id);
  }
}
