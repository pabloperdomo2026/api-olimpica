import { Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';
import { UsuarioRepository } from '../usuario.repository';
import { listartUsuariosMapper } from '../mappers/listar-usuarios.mapper';

@Injectable()
export class ListarUsuariosUseCase {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}
    
  async execute(organizacionId: string): Promise<UsuarioResponse[]> {
    try {
        const usuarios = await this.usuarioRepository.listarTodos();

        return listartUsuariosMapper(usuarios);
    } catch (error) {
        throw new HttpException(
            {
              description: 'Error al obtener los usuarios',
              errorMessage: error.response
            },
            error.status
          )
    }
  }
}
