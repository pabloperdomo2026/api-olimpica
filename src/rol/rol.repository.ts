import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolEntity } from './rol.entity';
import { Rol } from './interfaces/rol.interface';

@Injectable()
export class RolRepository {
  constructor(
    @InjectRepository(RolEntity)
    private readonly rolRepository: Repository<RolEntity>,
  ) {}

  async crear(rol: Rol): Promise<RolEntity> {
    return this.rolRepository.save({
      codigo: rol.codigo,
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      activo: rol.activo,
      usuarioCreacion: rol.usuarioCreacion,
    });
  }

  async listarTodos(): Promise<RolEntity[]> {
    return this.rolRepository.find();
  }

  async obtenerPorId(id: string): Promise<RolEntity | null> {
    return this.rolRepository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<RolEntity | null> {
    return this.rolRepository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<RolEntity>): Promise<RolEntity | null> {
    await this.rolRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.rolRepository.delete(id);
  }
}
