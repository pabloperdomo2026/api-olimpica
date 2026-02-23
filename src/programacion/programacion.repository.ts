import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramacionEntity } from './programacion.entity';

@Injectable()
export class ProgramacionRepository {
  constructor(
    @InjectRepository(ProgramacionEntity)
    private readonly repository: Repository<ProgramacionEntity>,
  ) {}

  async listarActivas(): Promise<ProgramacionEntity[]> {
    return this.repository.find({
      where: { activo: 'S' },
      relations: ['proceso'],
    });
  }
}
