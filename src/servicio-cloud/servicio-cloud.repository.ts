import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicioCloudEntity } from './servicio-cloud.entity';

@Injectable()
export class ServicioCloudRepository {
  constructor(
    @InjectRepository(ServicioCloudEntity)
    private readonly servicioCloudRepository: Repository<ServicioCloudEntity>,
  ) {}

  async crear(data: Partial<ServicioCloudEntity>): Promise<ServicioCloudEntity> {
    return this.servicioCloudRepository.save(data);
  }

  async listarTodos(): Promise<ServicioCloudEntity[]> {
    return this.servicioCloudRepository.find({ relations: ['proveedorCloud'] });
  }

  async obtenerPorId(id: string): Promise<ServicioCloudEntity | null> {
    return this.servicioCloudRepository.findOne({ where: { id }, relations: ['proveedorCloud'] });
  }

  async actualizar(id: string, data: Partial<ServicioCloudEntity>): Promise<ServicioCloudEntity | null> {
    await this.servicioCloudRepository.update(id, data);
    return this.servicioCloudRepository.findOne({ where: { id }, relations: ['proveedorCloud'] });
  }

  async eliminar(id: string): Promise<void> {
    await this.servicioCloudRepository.delete(id);
  }
}
