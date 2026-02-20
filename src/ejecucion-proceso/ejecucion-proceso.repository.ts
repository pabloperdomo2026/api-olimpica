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
}
