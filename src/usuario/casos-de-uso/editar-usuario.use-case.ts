import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';
import { ActualizarUsuarioDto } from '../dtos';
import { UsuarioRepository } from '../usuario.repository';
import { crearUsuarioMapper } from '../mappers/crear-usuario.mapper';

@Injectable()
export class EditarUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(
    id: string,
    dto: ActualizarUsuarioDto,
  ): Promise<UsuarioResponse> {
    try {
      const existente = await this.usuarioRepository.obtenerPorId(id);

      if (!existente) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      const datosActualizar: Record<string, unknown> = {};
      if (dto.nombre !== undefined) datosActualizar.nombre = dto.nombre;
      if (dto.apellido !== undefined) datosActualizar.apellido = dto.apellido;
      if (dto.activo !== undefined) datosActualizar.activo = dto.activo ? 'S' : 'N';

      const actualizado = await this.usuarioRepository.actualizar(id, datosActualizar);

      return crearUsuarioMapper(actualizado!);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new HttpException(
        {
          description: 'Error al actualizar el usuario',
          errorMessage: error.response || error.message,
        },
        error.status || 500,
      );
    }
  }
}
