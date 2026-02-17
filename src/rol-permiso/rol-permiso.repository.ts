import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolPermisoEntity } from './rol-permiso.entity';

@Injectable()
export class RolPermisoRepository {
  constructor(
    @InjectRepository(RolPermisoEntity)
    private readonly rolPermisoRepository: Repository<RolPermisoEntity>,
  ) {}

  async listarPorRol(rolId: string): Promise<RolPermisoEntity[]> {
    return this.rolPermisoRepository.find({
      where: { rolId },
      relations: ['permiso'],
    });
  }

  async obtenerAsignacion(rolId: string, permisoId: string): Promise<RolPermisoEntity | null> {
    return this.rolPermisoRepository.findOne({
      where: { rolId, permisoId },
    });
  }

  async asignar(rolId: string, permisoId: string): Promise<RolPermisoEntity> {
    return this.rolPermisoRepository.save({
      rolId,
      permisoId,
    });
  }

  async desasignar(id: string): Promise<void> {
    await this.rolPermisoRepository.delete(id);
  }
}
