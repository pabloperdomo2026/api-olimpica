import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MensajeErrorEntity } from './mensaje-error.entity';

@Injectable()
export class MensajeErrorRepository {
  constructor(
    @InjectRepository(MensajeErrorEntity)
    private readonly repository: Repository<MensajeErrorEntity>,
  ) {}

  async crear(data: Partial<MensajeErrorEntity>): Promise<MensajeErrorEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<MensajeErrorEntity[]> {
    return this.repository.find({ order: { codigoError: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<MensajeErrorEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigoError: string): Promise<MensajeErrorEntity | null> {
    return this.repository.findOne({ where: { codigoError } });
  }

  async actualizar(id: string, data: Partial<MensajeErrorEntity>): Promise<MensajeErrorEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
