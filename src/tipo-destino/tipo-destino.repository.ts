import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoDestinoEntity } from './tipo-destino.entity';

@Injectable()
export class TipoDestinoRepository {
  constructor(
    @InjectRepository(TipoDestinoEntity)
    private readonly repository: Repository<TipoDestinoEntity>,
  ) {}

  async crear(data: Partial<TipoDestinoEntity>): Promise<TipoDestinoEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<TipoDestinoEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<TipoDestinoEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<TipoDestinoEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<TipoDestinoEntity>): Promise<TipoDestinoEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
