import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoProgramacionEntity } from './tipo-programacion.entity';

@Injectable()
export class TipoProgramacionRepository {
  constructor(
    @InjectRepository(TipoProgramacionEntity)
    private readonly repository: Repository<TipoProgramacionEntity>,
  ) {}

  async crear(data: Partial<TipoProgramacionEntity>): Promise<TipoProgramacionEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<TipoProgramacionEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<TipoProgramacionEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<TipoProgramacionEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<TipoProgramacionEntity>): Promise<TipoProgramacionEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
