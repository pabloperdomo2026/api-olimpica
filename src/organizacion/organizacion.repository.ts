import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizacionEntity } from './organizacion.entity';
import { Organizacion } from './interfaces/organizacion.interface';

@Injectable()
export class OrganizacionRepository {
  constructor(
    @InjectRepository(OrganizacionEntity)
    private readonly organizacionRepository: Repository<OrganizacionEntity>,
  ) {}

  async crear(organizacion: Organizacion): Promise<OrganizacionEntity> {
    return this.organizacionRepository.save({
      codigoOrg: organizacion.codigoOrg,
      nombreOrg: organizacion.nombreOrg,
      razonSocial: organizacion.razonSocial,
      nit: organizacion.nit,
      pais: organizacion.pais,
      ciudad: organizacion.ciudad,
      direccion: organizacion.direccion,
      telefonoContacto: organizacion.telefonoContacto,
      emailContacto: organizacion.emailContacto,
      activo: organizacion.activo,
      usuarioCreacion: organizacion.usuarioCreacion,
      perteneceA: organizacion.perteneceA,
    });
  }

  async listarTodos(): Promise<OrganizacionEntity[]> {
    return this.organizacionRepository.find();
  }

  async obtenerPorId(id: string): Promise<OrganizacionEntity | null> {
    return this.organizacionRepository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigoOrg: string): Promise<OrganizacionEntity | null> {
    return this.organizacionRepository.findOne({ where: { codigoOrg } });
  }

  async obtenerPorNit(nit: string): Promise<OrganizacionEntity | null> {
    return this.organizacionRepository.findOne({ where: { nit } });
  }

  async actualizar(id: string, data: Partial<OrganizacionEntity>): Promise<OrganizacionEntity | null> {
    await this.organizacionRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.organizacionRepository.delete(id);
  }
}
