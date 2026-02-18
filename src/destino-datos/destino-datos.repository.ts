import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DestinoDatosEntity } from './destino-datos.entity';

@Injectable()
export class DestinoDatosRepository {
  constructor(
    @InjectRepository(DestinoDatosEntity)
    private readonly repository: Repository<DestinoDatosEntity>,
  ) {}

  async crear(data: Partial<DestinoDatosEntity>): Promise<DestinoDatosEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<DestinoDatosEntity[]> {
    return this.repository.find({ order: { codigo: 'ASC' } });
  }

  async listarPorOrganizacion(organizacionId: string): Promise<DestinoDatosEntity[]> {
    return this.repository.find({ where: { organizacionId }, order: { codigo: 'ASC' } });
  }

  async obtenerPorId(id: string): Promise<DestinoDatosEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<DestinoDatosEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<DestinoDatosEntity>): Promise<DestinoDatosEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
