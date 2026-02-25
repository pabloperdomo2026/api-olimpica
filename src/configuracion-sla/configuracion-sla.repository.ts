import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionSlaEntity } from './configuracion-sla.entity';

@Injectable()
export class ConfiguracionSlaRepository {
  constructor(
    @InjectRepository(ConfiguracionSlaEntity)
    private readonly repositorio: Repository<ConfiguracionSlaEntity>,
  ) {}

  async listarTodos(): Promise<ConfiguracionSlaEntity[]> {
    return this.repositorio.find({
      relations: ['proceso'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async obtenerPorId(id: string): Promise<ConfiguracionSlaEntity | null> {
    return this.repositorio.findOne({
      where: { id },
      relations: ['proceso'],
    });
  }

  async crear(datos: Partial<ConfiguracionSlaEntity>): Promise<ConfiguracionSlaEntity> {
    const entidad = this.repositorio.create(datos);
    const guardado = await this.repositorio.save(entidad);
    return (await this.obtenerPorId(guardado.id))!;
  }

  async actualizar(id: string, datos: Partial<ConfiguracionSlaEntity>): Promise<ConfiguracionSlaEntity | null> {
    await this.repositorio.update(id, datos);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repositorio.delete(id);
  }
}
