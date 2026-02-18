import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDatoEntity } from './tipo-dato.entity';

@Injectable()
export class TipoDatoRepository {
  constructor(
    @InjectRepository(TipoDatoEntity)
    private readonly repository: Repository<TipoDatoEntity>,
  ) {}

  async crear(data: Partial<TipoDatoEntity>): Promise<TipoDatoEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<TipoDatoEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<TipoDatoEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<TipoDatoEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<TipoDatoEntity>): Promise<TipoDatoEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
