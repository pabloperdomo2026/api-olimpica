import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermisoEntity } from './permiso.entity';
import { Permiso } from './interfaces/permiso.interface';

@Injectable()
export class PermisoRepository {
  constructor(
    @InjectRepository(PermisoEntity)
    private readonly permisoRepository: Repository<PermisoEntity>,
  ) {}

  async crear(permiso: Permiso): Promise<PermisoEntity> {
    return this.permisoRepository.save({
      codigo: permiso.codigo,
      nombre: permiso.nombre,
      descripcion: permiso.descripcion,
      activo: permiso.activo,
      usuarioCreacion: permiso.usuarioCreacion,
    });
  }

  async listarTodos(): Promise<PermisoEntity[]> {
    return this.permisoRepository.find();
  }

  async obtenerPorId(id: string): Promise<PermisoEntity | null> {
    return this.permisoRepository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<PermisoEntity | null> {
    return this.permisoRepository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<PermisoEntity>): Promise<PermisoEntity | null> {
    await this.permisoRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.permisoRepository.delete(id);
  }
}
