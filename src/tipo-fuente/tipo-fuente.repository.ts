import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoFuenteEntity } from './tipo-fuente.entity';

@Injectable()
export class TipoFuenteRepository {
  constructor(
    @InjectRepository(TipoFuenteEntity)
    private readonly repository: Repository<TipoFuenteEntity>,
  ) {}

  async crear(data: Partial<TipoFuenteEntity>): Promise<TipoFuenteEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<TipoFuenteEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<TipoFuenteEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<TipoFuenteEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<TipoFuenteEntity>): Promise<TipoFuenteEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
