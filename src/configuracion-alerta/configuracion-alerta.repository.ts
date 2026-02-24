import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionAlertaEntity } from './configuracion-alerta.entity';

@Injectable()
export class ConfiguracionAlertaRepository {
  constructor(
    @InjectRepository(ConfiguracionAlertaEntity)
    private readonly repositorio: Repository<ConfiguracionAlertaEntity>,
  ) {}

  async listarTodos(): Promise<ConfiguracionAlertaEntity[]> {
    return this.repositorio.find({
      relations: ['tipoAlerta', 'proceso', 'recipiente'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async obtenerPorId(id: string): Promise<ConfiguracionAlertaEntity | null> {
    return this.repositorio.findOne({
      where: { id },
      relations: ['tipoAlerta', 'proceso', 'recipiente'],
    });
  }

  async crear(datos: Partial<ConfiguracionAlertaEntity>): Promise<ConfiguracionAlertaEntity> {
    const entidad = this.repositorio.create(datos);
    const guardado = await this.repositorio.save(entidad);
    return (await this.obtenerPorId(guardado.id))!;
  }

  async actualizar(id: string, datos: Partial<ConfiguracionAlertaEntity>): Promise<ConfiguracionAlertaEntity | null> {
    await this.repositorio.update(id, datos);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.repositorio.delete(id);
  }
}
