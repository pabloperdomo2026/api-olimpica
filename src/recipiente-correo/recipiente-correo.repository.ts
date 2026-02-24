import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipienteCorreoEntity } from './recipiente-correo.entity';

@Injectable()
export class RecipienteCorreoRepository {
  constructor(
    @InjectRepository(RecipienteCorreoEntity)
    private readonly repositorio: Repository<RecipienteCorreoEntity>,
  ) {}

  async crear(datos: Partial<RecipienteCorreoEntity>): Promise<RecipienteCorreoEntity> {
    const entidad = this.repositorio.create(datos);
    const guardada = await this.repositorio.save(entidad);
    return this.obtenerPorId(guardada.id) as Promise<RecipienteCorreoEntity>;
  }

  async listarTodos(): Promise<RecipienteCorreoEntity[]> {
    return this.repositorio.find({
      relations: ['organizacion'],
      order: { codigo: 'ASC' },
    });
  }

  async obtenerPorId(id: string): Promise<RecipienteCorreoEntity | null> {
    return this.repositorio.findOne({ where: { id }, relations: ['organizacion'] });
  }

  async obtenerPorCodigo(codigo: string): Promise<RecipienteCorreoEntity | null> {
    return this.repositorio.findOne({ where: { codigo } });
  }

  async actualizar(id: string, datos: Partial<RecipienteCorreoEntity>): Promise<RecipienteCorreoEntity | null> {
    await this.repositorio.update(id, datos);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repositorio.delete(id);
  }
}
