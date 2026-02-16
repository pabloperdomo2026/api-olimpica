import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Usuario } from './interfaces/usuario.interface';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async crear(usuario: Usuario): Promise<UsuarioEntity> {
    return this.usuarioRepository.save({
      usuarioId: usuario.usuarioId,
      organizacionId: usuario.organizacionId,
      email: usuario.email,
      passwordHash: usuario.passwordHash,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaCreacion: usuario.fechaCreacion,
      fechaModificacion: usuario.fechaModificacion,
      usuarioCreacion: usuario.usuarioCreacion,
      usuarioModificacion: usuario.usuarioModificacion,
    });
  }

  async listarTodos(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }

  async obtenerPorId(id: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOne({ where: { id: id } });
  }

  async obtenerPorEmail(email: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async actualizar(id: string, data: Partial<UsuarioEntity>): Promise<UsuarioEntity | null> {
    await this.usuarioRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}