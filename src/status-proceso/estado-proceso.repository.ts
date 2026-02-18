import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoProcesoEntity } from './estado-proceso.entity';

@Injectable()
export class EstadoProcesoRepository {
  constructor(
    @InjectRepository(EstadoProcesoEntity)
    private readonly repository: Repository<EstadoProcesoEntity>,
  ) {}

  async crear(data: Partial<EstadoProcesoEntity>): Promise<EstadoProcesoEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<EstadoProcesoEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<EstadoProcesoEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<EstadoProcesoEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<EstadoProcesoEntity>): Promise<EstadoProcesoEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
