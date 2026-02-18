import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcesoMapeoCampoEntity } from './proceso-mapeo-campo.entity';

@Injectable()
export class ProcesoMapeoCampoRepository {
  constructor(
    @InjectRepository(ProcesoMapeoCampoEntity)
    private readonly repository: Repository<ProcesoMapeoCampoEntity>,
  ) {}

  async crear(data: Partial<ProcesoMapeoCampoEntity>): Promise<ProcesoMapeoCampoEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<ProcesoMapeoCampoEntity[]> {
    return this.repository.find({
      order: { procesoId: 'ASC', posicionOrdinal: 'ASC', nombreColumna: 'ASC' },
    });
  }

  async listarPorProceso(procesoId: string): Promise<ProcesoMapeoCampoEntity[]> {
    return this.repository.find({
      where: { procesoId },
      order: { posicionOrdinal: 'ASC', nombreColumna: 'ASC' },
    });
  }

  async obtenerPorId(id: string): Promise<ProcesoMapeoCampoEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async actualizar(id: string, data: Partial<ProcesoMapeoCampoEntity>): Promise<ProcesoMapeoCampoEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
