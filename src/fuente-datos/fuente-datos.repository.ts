import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuenteDatosEntity } from './fuente-datos.entity';

@Injectable()
export class FuenteDatosRepository {
  constructor(
    @InjectRepository(FuenteDatosEntity)
    private readonly repository: Repository<FuenteDatosEntity>,
  ) {}

  async crear(data: Partial<FuenteDatosEntity>): Promise<FuenteDatosEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<FuenteDatosEntity[]> {
    return this.repository.find({ order: { nombre: 'ASC' } });
  }

  async listarPorOrganizacion(organizacionId: string): Promise<FuenteDatosEntity[]> {
    return this.repository.find({
      where: { organizacionId },
      order: { nombre: 'ASC' },
    });
  }

  async obtenerPorId(id: string): Promise<FuenteDatosEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<FuenteDatosEntity | null> {
    return this.repository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<FuenteDatosEntity>): Promise<FuenteDatosEntity | null> {
    await this.repository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
