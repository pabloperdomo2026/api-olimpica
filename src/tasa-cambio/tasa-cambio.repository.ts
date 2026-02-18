import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasaCambioEntity } from './tasa-cambio.entity';

@Injectable()
export class TasaCambioRepository {
  constructor(
    @InjectRepository(TasaCambioEntity)
    private readonly repository: Repository<TasaCambioEntity>,
  ) {}

  async crear(data: Partial<TasaCambioEntity>): Promise<TasaCambioEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<TasaCambioEntity[]> {
    return this.repository.find({ order: { tasaCambioId: 'DESC' } });
  }

  async obtenerPorId(id: number): Promise<TasaCambioEntity | null> {
    return this.repository.findOne({ where: { tasaCambioId: id } });
  }

  async actualizar(id: number, data: Partial<TasaCambioEntity>): Promise<TasaCambioEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
