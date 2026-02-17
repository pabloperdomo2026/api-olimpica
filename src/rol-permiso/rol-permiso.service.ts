import { Injectable, ConflictException, NotFoundException, HttpException } from '@nestjs/common';
import { RolPermisoRepository } from './rol-permiso.repository';
import { RolRepository } from '../rol/rol.repository';
import { PermisoRepository } from '../permiso/permiso.repository';
import { PermisoResponse } from '../permiso/interfaces/permiso-response.interface';

@Injectable()
export class RolPermisoService {
  constructor(
    private readonly rolPermisoRepository: RolPermisoRepository,
    private readonly rolRepository: RolRepository,
    private readonly permisoRepository: PermisoRepository,
  ) {}

  async listarPermisosPorRol(rolId: string): Promise<PermisoResponse[]> {
    try {
      const rol = await this.rolRepository.obtenerPorId(rolId);
      if (!rol) {
        throw new NotFoundException(`Rol con id ${rolId} no encontrado`);
      }

      const asignaciones = await this.rolPermisoRepository.listarPorRol(rolId);

      return asignaciones.map((asignacion) => ({
        id: asignacion.permiso.id,
        codigo: asignacion.permiso.codigo,
        nombre: asignacion.permiso.nombre,
        descripcion: asignacion.permiso.descripcion,
        activo: asignacion.permiso.activo,
        fechaCreacion: asignacion.permiso.fechaCreacion,
        fechaModificacion: asignacion.permiso.fechaModificacion,
      }));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al listar permisos del rol', errorMessage: error.message },
        500,
      );
    }
  }

  async asignarPermiso(rolId: string, permisoId: string): Promise<{ mensaje: string }> {
    try {
      const rol = await this.rolRepository.obtenerPorId(rolId);
      if (!rol) {
        throw new NotFoundException(`Rol con id ${rolId} no encontrado`);
      }

      const permiso = await this.permisoRepository.obtenerPorId(permisoId);
      if (!permiso) {
        throw new NotFoundException(`Permiso con id ${permisoId} no encontrado`);
      }

      const existente = await this.rolPermisoRepository.obtenerAsignacion(rolId, permisoId);
      if (existente) {
        throw new ConflictException(`El rol ya tiene asignado el permiso ${permiso.nombre}`);
      }

      await this.rolPermisoRepository.asignar(rolId, permisoId);

      return { mensaje: `Permiso ${permiso.nombre} asignado correctamente` };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al asignar permiso', errorMessage: error.message },
        500,
      );
    }
  }

  async desasignarPermiso(rolId: string, permisoId: string): Promise<{ mensaje: string }> {
    try {
      const asignacion = await this.rolPermisoRepository.obtenerAsignacion(rolId, permisoId);
      if (!asignacion) {
        throw new NotFoundException(`El rol no tiene asignado ese permiso`);
      }

      await this.rolPermisoRepository.desasignar(asignacion.id);

      return { mensaje: 'Permiso desasignado correctamente' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { description: 'Error al desasignar permiso', errorMessage: error.message },
        500,
      );
    }
  }
}
