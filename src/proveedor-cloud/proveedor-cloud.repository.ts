import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProveedorCloudEntity } from './proveedor-cloud.entity';

@Injectable()
export class ProveedorCloudRepository {
  constructor(
    @InjectRepository(ProveedorCloudEntity)
    private readonly proveedorCloudRepository: Repository<ProveedorCloudEntity>,
  ) {}

  async crear(data: Partial<ProveedorCloudEntity>): Promise<ProveedorCloudEntity> {
    return this.proveedorCloudRepository.save(data);
  }

  async listarTodos(): Promise<ProveedorCloudEntity[]> {
    return this.proveedorCloudRepository.find();
  }

  async obtenerPorId(id: string): Promise<ProveedorCloudEntity | null> {
    return this.proveedorCloudRepository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<ProveedorCloudEntity | null> {
    return this.proveedorCloudRepository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<ProveedorCloudEntity>): Promise<ProveedorCloudEntity | null> {
    await this.proveedorCloudRepository.update(id, data);
    return this.proveedorCloudRepository.findOne({ where: { id } });
  }

  async eliminar(id: string): Promise<void> {
    await this.proveedorCloudRepository.delete(id);
  }
}
