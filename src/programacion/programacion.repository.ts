import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramacionEntity } from './programacion.entity';

const RELACIONES = ['proceso', 'tipoProgramacion'];

@Injectable()
export class ProgramacionRepository {
  constructor(
    @InjectRepository(ProgramacionEntity)
    private readonly repository: Repository<ProgramacionEntity>,
  ) {}

  async listarTodos(): Promise<ProgramacionEntity[]> {
    return this.repository.find({
      relations: RELACIONES,
      order: { fechaCreacion: 'DESC' },
    });
  }

  async listarActivas(): Promise<ProgramacionEntity[]> {
    return this.repository.find({
      where: { activo: 'S' },
      relations: RELACIONES,
    });
  }

  async obtenerPorId(id: string): Promise<ProgramacionEntity | null> {
    return this.repository.findOne({ where: { id }, relations: RELACIONES });
  }

  async crear(data: Partial<ProgramacionEntity>): Promise<ProgramacionEntity> {
    const entidad = this.repository.create(data);
    const guardada = await this.repository.save(entidad);
    return this.obtenerPorId(guardada.id) as Promise<ProgramacionEntity>;
  }

  async actualizar(id: string, data: Partial<ProgramacionEntity>): Promise<ProgramacionEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
