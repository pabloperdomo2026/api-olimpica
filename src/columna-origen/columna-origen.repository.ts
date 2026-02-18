import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnaOrigenEntity } from './columna-origen.entity';

@Injectable()
export class ColumnaOrigenRepository {
  constructor(
    @InjectRepository(ColumnaOrigenEntity)
    private readonly repository: Repository<ColumnaOrigenEntity>,
  ) {}

  async crear(data: Partial<ColumnaOrigenEntity>): Promise<ColumnaOrigenEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<ColumnaOrigenEntity[]> {
    return this.repository.find({ order: { fuenteId: 'ASC', posicionOrdinal: 'ASC', nombreColumna: 'ASC' } });
  }

  async listarPorFuente(fuenteId: string): Promise<ColumnaOrigenEntity[]> {
    return this.repository.find({
      where: { fuenteId },
      order: { posicionOrdinal: 'ASC', nombreColumna: 'ASC' },
    });
  }

  async obtenerPorId(id: string): Promise<ColumnaOrigenEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async actualizar(id: string, data: Partial<ColumnaOrigenEntity>): Promise<ColumnaOrigenEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
