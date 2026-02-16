import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';

export interface EliminarUsuarioResponse {
  mensaje: string;
  usuarioId: string;
}

@Injectable()
export class EliminarUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(id: string): Promise<EliminarUsuarioResponse> {
    try {
      const existente = await this.usuarioRepository.obtenerPorId(id);

      if (!existente) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      await this.usuarioRepository.eliminar(id);

      return {
        mensaje: 'Usuario eliminado exitosamente',
        usuarioId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        {
          description: 'Error al eliminar el usuario',
          errorMessage: error.response || error.message,
        },
        error.status || 500,
      );
    }
  }
}
