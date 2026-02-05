import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UsuarioResponse } from '../interfaces';
import { usuariosDb, simulateDbDelay } from './usuarios.data';

@Injectable()
export class ListarUsuariosUseCase {
  async execute(organizacionId?: number): Promise<UsuarioResponse[]> {
    try {
      await simulateDbDelay();
      console.log('[DB] SELECT * FROM smr_usuario');

      let usuarios = usuariosDb;

      if (organizacionId) {
        console.log('[DB] WHERE smr_organizacion_organizacion_id =', organizacionId);
        usuarios = usuarios.filter((u) => u.organizacionId === organizacionId);
      }

      return usuarios.map((u) => ({
        usuarioId: u.usuarioId,
        organizacionId: u.organizacionId,
        email: u.email,
        nombre: u.nombre,
        apellido: u.apellido,
        activo: u.activo,
        fechaCreacion: u.fechaCreacion,
        fechaModificacion: u.fechaModificacion,
      }));
    } catch (error) {
      console.error('[DB] Error al listar usuarios:', error.message);
      throw new InternalServerErrorException('Error al listar usuarios');
    }
  }

  async executeById(usuarioId: number): Promise<UsuarioResponse> {
    try {
      await simulateDbDelay();
      console.log('[DB] SELECT * FROM smr_usuario WHERE usuario_id =', usuarioId);

      const usuario = usuariosDb.find((u) => u.usuarioId === usuarioId);

      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${usuarioId} no encontrado`);
      }

      return {
        usuarioId: usuario.usuarioId,
        organizacionId: usuario.organizacionId,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        activo: usuario.activo,
        fechaCreacion: usuario.fechaCreacion,
        fechaModificacion: usuario.fechaModificacion,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('[DB] Error al obtener usuario:', error.message);
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }
}
