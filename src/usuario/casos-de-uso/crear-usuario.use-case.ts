import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Usuario, UsuarioResponse } from '../interfaces';
import { CrearUsuarioDto } from '../dtos';
import { usuariosDb, simulateDbDelay, getNextId } from './usuarios.data';

@Injectable()
export class CrearUsuarioUseCase {
  async execute(dto: CrearUsuarioDto, usuarioCreacion: string): Promise<UsuarioResponse> {
    try {
      await simulateDbDelay();
      console.log('[DB] SELECT * FROM smr_usuario WHERE email = ?', dto.email);

      const existeEmail = usuariosDb.find(
        (u) => u.email.toLowerCase() === dto.email.toLowerCase(),
      );

      if (existeEmail) {
        throw new ConflictException(`El email ${dto.email} ya está registrado`);
      }

      const passwordHash = `$2b$10$${Buffer.from(dto.password).toString('base64')}`;

      const nuevoUsuario: Usuario = {
        usuarioId: getNextId(),
        organizacionId: dto.organizacionId,
        email: dto.email,
        passwordHash,
        nombre: dto.nombre,
        apellido: dto?.apellido,
        activo: true,
        fechaCreacion: new Date(),
        usuarioCreacion,
      };

      usuariosDb.push(nuevoUsuario);
      console.log('[DB] INSERT INTO smr_usuario - ID:', nuevoUsuario.usuarioId);

      return {
        usuarioId: nuevoUsuario.usuarioId,
        organizacionId: nuevoUsuario.organizacionId,
        email: nuevoUsuario.email,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        activo: nuevoUsuario.activo,
        fechaCreacion: nuevoUsuario.fechaCreacion,
        fechaModificacion: nuevoUsuario.fechaModificacion,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('[DB] Error al crear usuario:', error.message);
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
}
