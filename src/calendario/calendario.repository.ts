import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarioEntity } from './calendario.entity';

@Injectable()
export class CalendarioRepository {
  constructor(
    @InjectRepository(CalendarioEntity)
    private readonly repository: Repository<CalendarioEntity>,
  ) {}

  async crear(data: Partial<CalendarioEntity>): Promise<CalendarioEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<CalendarioEntity[]> {
    return this.repository.find({
      order: { fecha: 'ASC' },
    });
  }

  async obtenerPorId(fechaId: number): Promise<CalendarioEntity | null> {
    return this.repository.findOne({ where: { fechaId } });
  }

  async actualizar(fechaId: number, data: Partial<CalendarioEntity>): Promise<CalendarioEntity | null> {
    await this.repository.update(fechaId, data);
    return this.obtenerPorId(fechaId);
  }

  async eliminar(fechaId: number): Promise<void> {
    await this.repository.delete(fechaId);
  }
}
