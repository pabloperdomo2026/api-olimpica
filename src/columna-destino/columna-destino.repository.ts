import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnaDestinoEntity } from './columna-destino.entity';

@Injectable()
export class ColumnaDestinoRepository {
  constructor(
    @InjectRepository(ColumnaDestinoEntity)
    private readonly repository: Repository<ColumnaDestinoEntity>,
  ) {}

  async crear(data: Partial<ColumnaDestinoEntity>): Promise<ColumnaDestinoEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<ColumnaDestinoEntity[]> {
    return this.repository.find({ order: { destinoId: 'ASC', posicionOrdinal: 'ASC', nombreColumna: 'ASC' } });
  }

  async listarPorDestino(destinoId: string): Promise<ColumnaDestinoEntity[]> {
    return this.repository.find({
      where: { destinoId },
      order: { posicionOrdinal: 'ASC', nombreColumna: 'ASC' },
    });
  }

  async obtenerPorId(id: string): Promise<ColumnaDestinoEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async actualizar(id: string, data: Partial<ColumnaDestinoEntity>): Promise<ColumnaDestinoEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
