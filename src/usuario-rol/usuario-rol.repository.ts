import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRolEntity } from './usuario-rol.entity';

@Injectable()
export class UsuarioRolRepository {
  constructor(
    @InjectRepository(UsuarioRolEntity)
    private readonly usuarioRolRepository: Repository<UsuarioRolEntity>,
  ) {}

  async listarPorUsuario(usuarioId: string): Promise<UsuarioRolEntity[]> {
    return this.usuarioRolRepository.find({
      where: { usuarioId },
      relations: ['rol'],
    });
  }

  async obtenerAsignacion(usuarioId: string, rolId: string): Promise<UsuarioRolEntity | null> {
    return this.usuarioRolRepository.findOne({
      where: { usuarioId, rolId },
    });
  }

  async asignar(usuarioId: string, rolId: string): Promise<UsuarioRolEntity> {
    return this.usuarioRolRepository.save({
      usuarioId,
      rolId,
    });
  }

  async desasignar(id: string): Promise<void> {
    await this.usuarioRolRepository.delete(id);
  }
}
