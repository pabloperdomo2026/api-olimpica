import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuncionesSistemaEntity } from './funciones-sistema.entity';

@Injectable()
export class FuncionesSistemaRepository {
  constructor(
    @InjectRepository(FuncionesSistemaEntity)
    private readonly repository: Repository<FuncionesSistemaEntity>,
  ) {}

  async crear(data: Partial<FuncionesSistemaEntity>): Promise<FuncionesSistemaEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<FuncionesSistemaEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<FuncionesSistemaEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<FuncionesSistemaEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<FuncionesSistemaEntity>): Promise<FuncionesSistemaEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
