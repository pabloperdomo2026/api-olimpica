import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NivelCriticidadEntity } from './nivel-criticidad.entity';

@Injectable()
export class NivelCriticidadRepository {
  constructor(
    @InjectRepository(NivelCriticidadEntity)
    private readonly repository: Repository<NivelCriticidadEntity>,
  ) {}

  async crear(data: Partial<NivelCriticidadEntity>): Promise<NivelCriticidadEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<NivelCriticidadEntity[]> {
    return this.repository.find({ order: { nivelNumerico: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<NivelCriticidadEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<NivelCriticidadEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<NivelCriticidadEntity>): Promise<NivelCriticidadEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
