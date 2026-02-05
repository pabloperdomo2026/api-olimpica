import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuntoVentaEntity } from './punto-venta.entity';
import { PuntoVenta } from './interfaces/punto-venta.interface';

@Injectable()
export class PuntoVentaRepository {
  constructor(
    @InjectRepository(PuntoVentaEntity)
    private readonly puntoVentaRepository: Repository<PuntoVentaEntity>,
  ) {}

  async crear(puntoVenta: PuntoVenta): Promise<PuntoVentaEntity> {
    return this.puntoVentaRepository.save({
      organizacionId: puntoVenta.organizacionId,
      codigoTienda: puntoVenta.codigoTienda,
      nombreTienda: puntoVenta.nombreTienda,
      ciudad: puntoVenta.ciudad,
      direccion: puntoVenta.direccion,
      activo: puntoVenta.activo,
      usuarioCreacion: puntoVenta.usuarioCreacion,
    });
  }

  async listarTodos(): Promise<PuntoVentaEntity[]> {
    return this.puntoVentaRepository.find();
  }

  async listarPorOrganizacion(organizacionId: string): Promise<PuntoVentaEntity[]> {
    return this.puntoVentaRepository.find({ where: { organizacionId } });
  }

  async obtenerPorId(id: string): Promise<PuntoVentaEntity | null> {
    return this.puntoVentaRepository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigoTienda: string): Promise<PuntoVentaEntity | null> {
    return this.puntoVentaRepository.findOne({ where: { codigoTienda } });
  }

  async actualizar(id: string, data: Partial<PuntoVentaEntity>): Promise<PuntoVentaEntity | null> {
    await this.puntoVentaRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.puntoVentaRepository.delete(id);
  }
}
