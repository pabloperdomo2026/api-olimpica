import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonedaEntity } from './moneda.entity';
import { Moneda } from './interfaces/moneda.interface';

@Injectable()
export class MonedaRepository {
  constructor(
    @InjectRepository(MonedaEntity)
    private readonly monedaRepository: Repository<MonedaEntity>,
  ) {}

  async crear(moneda: Moneda): Promise<MonedaEntity> {
    return this.monedaRepository.save({
      codigoMoneda: moneda.codigoMoneda,
      codigoIso4217: moneda.codigoIso4217,
      nombreMoneda: moneda.nombreMoneda,
      simboloMoneda: moneda.simboloMoneda,
      numeroDecimales: moneda.numeroDecimales,
      esMonedaBase: moneda.esMonedaBase,
      activo: moneda.activo,
      usuarioCreacion: moneda.usuarioCreacion,
    });
  }

  async listarTodos(): Promise<MonedaEntity[]> {
    return this.monedaRepository.find();
  }

  async obtenerPorId(id: string): Promise<MonedaEntity | null> {
    return this.monedaRepository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigoMoneda: string): Promise<MonedaEntity | null> {
    return this.monedaRepository.findOne({ where: { codigoMoneda } });
  }

  async actualizar(id: string, data: Partial<MonedaEntity>): Promise<MonedaEntity | null> {
    await this.monedaRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.monedaRepository.delete(id);
  }
}
