import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAlertaEntity } from './tipo-alerta.entity';

@Injectable()
export class TipoAlertaRepository {
  constructor(
    @InjectRepository(TipoAlertaEntity)
    private readonly repository: Repository<TipoAlertaEntity>,
  ) {}

  async crear(data: Partial<TipoAlertaEntity>): Promise<TipoAlertaEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<TipoAlertaEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<TipoAlertaEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<TipoAlertaEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<TipoAlertaEntity>): Promise<TipoAlertaEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
