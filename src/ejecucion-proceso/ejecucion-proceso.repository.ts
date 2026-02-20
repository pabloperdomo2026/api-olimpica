import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EjecucionProcesoEntity } from './ejecucion-proceso.entity';

@Injectable()
export class EjecucionProcesoRepository {
  constructor(
    @InjectRepository(EjecucionProcesoEntity)
    private readonly repositorio: Repository<EjecucionProcesoEntity>,
  ) {}

  async listarTodos(): Promise<EjecucionProcesoEntity[]> {
    return this.repositorio.find({
      relations: ['proceso', 'statusProceso'],
      order: { fechaHoraInicio: 'DESC' },
    });
  }

  async listarPorProceso(procesoId: string): Promise<EjecucionProcesoEntity[]> {
    return this.repositorio.find({
      where: { procesoId },
      relations: ['proceso', 'statusProceso'],
      order: { fechaHoraInicio: 'DESC' },
    });
  }

  async obtenerPorId(id: string): Promise<EjecucionProcesoEntity | null> {
    return this.repositorio.findOne({
      where: { id },
      relations: ['proceso', 'statusProceso'],
    });
  }

  async crear(datos: Partial<EjecucionProcesoEntity>): Promise<EjecucionProcesoEntity> {
    const nueva = this.repositorio.create(datos);
    const guardada = await this.repositorio.save(nueva);
    const conRelaciones = await this.obtenerPorId(guardada.id);
    return conRelaciones!;
  }

  async actualizar(id: string, datos: Partial<EjecucionProcesoEntity>): Promise<EjecucionProcesoEntity> {
    await this.repositorio.update(id, datos);
    const actualizado = await this.obtenerPorId(id);
    return actualizado!;
  }
}
