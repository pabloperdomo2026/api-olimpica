import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoProcesoEntity } from './tipo-proceso.entity';

@Injectable()
export class TipoProcesoRepository {
  constructor(
    @InjectRepository(TipoProcesoEntity)
    private readonly repository: Repository<TipoProcesoEntity>,
  ) {}

  async crear(data: Partial<TipoProcesoEntity>): Promise<TipoProcesoEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<TipoProcesoEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<TipoProcesoEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<TipoProcesoEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<TipoProcesoEntity>): Promise<TipoProcesoEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
