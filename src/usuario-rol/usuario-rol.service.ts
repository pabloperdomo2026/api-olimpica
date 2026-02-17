import { Injectable, ConflictException, NotFoundException, HttpException } from '@nestjs/common';
import { UsuarioRolRepository } from './usuario-rol.repository';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { RolRepository } from '../rol/rol.repository';
import { RolResponse } from '../rol/interfaces/rol-response.interface';

@Injectable()
export class UsuarioRolService {
  constructor(
    private readonly usuarioRolRepository: UsuarioRolRepository,
    private readonly usuarioRepository: UsuarioRepository,
    private readonly rolRepository: RolRepository,
  ) {}

  async listarRolesPorUsuario(usuarioId: string): Promise<RolResponse[]> {
    try {
      const usuario = await this.usuarioRepository.obtenerPorId(usuarioId);
      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${usuarioId} no encontrado`);
      }

      const asignaciones = await this.usuarioRolRepository.listarPorUsuario(usuarioId);

      return asignaciones.map((asignacion) => ({
        id: asignacion.rol.id,
        codigo: asignacion.rol.codigo,
        nombre: asignacion.rol.nombre,
        descripcion: asignacion.rol.descripcion,
        activo: asignacion.rol.activo,
        fechaCreacion: asignacion.rol.fechaCreacion,
        fechaModificacion: asignacion.rol.fechaModificacion,
      }));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al listar roles del usuario', errorMessage: error.message },
        500,
      );
    }
  }

  async asignarRol(usuarioId: string, rolId: string): Promise<{ mensaje: string }> {
    try {
      const usuario = await this.usuarioRepository.obtenerPorId(usuarioId);
      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${usuarioId} no encontrado`);
      }

      const rol = await this.rolRepository.obtenerPorId(rolId);
      if (!rol) {
        throw new NotFoundException(`Rol con id ${rolId} no encontrado`);
      }

      const existente = await this.usuarioRolRepository.obtenerAsignacion(usuarioId, rolId);
      if (existente) {
        throw new ConflictException(`El usuario ya tiene asignado el rol ${rol.nombre}`);
      }

      await this.usuarioRolRepository.asignar(usuarioId, rolId);

      return { mensaje: `Rol ${rol.nombre} asignado correctamente` };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al asignar rol', errorMessage: error.message },
        500,
      );
    }
  }

  async desasignarRol(usuarioId: string, rolId: string): Promise<{ mensaje: string }> {
    try {
      const asignacion = await this.usuarioRolRepository.obtenerAsignacion(usuarioId, rolId);
      if (!asignacion) {
        throw new NotFoundException(`El usuario no tiene asignado ese rol`);
      }

      await this.usuarioRolRepository.desasignar(asignacion.id);

      return { mensaje: 'Rol desasignado correctamente' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al desasignar rol', errorMessage: error.message },
        500,
      );
    }
  }
}
