import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcesoEntity } from './proceso.entity';
import { Proceso } from './interfaces/proceso.interface';

@Injectable()
export class ProcesoRepository {
  constructor(
    @InjectRepository(ProcesoEntity)
    private readonly procesoRepository: Repository<ProcesoEntity>,
  ) {}

  async crear(proceso: Proceso): Promise<ProcesoEntity> {
    return this.procesoRepository.save({
      organizacionId: proceso.organizacionId,
      tipoProcesoId: proceso.tipoProcesoId,
      nivelCriticidadId: proceso.nivelCriticidadId,
      codigo: proceso.codigo,
      nombre: proceso.nombre,
      descripcion: proceso.descripcion,
      version: proceso.version,
      idWorkflowCloud: proceso.idWorkflowCloud,
      workflowSecret: proceso.workflowSecret,
      parametrosJson: proceso.parametrosJson,
      servicioCloudId: proceso.servicioCloudId,
      esProcesoInicial: proceso.esProcesoInicial,
      activo: proceso.activo,
      usuarioCreacion: proceso.usuarioCreacion,
      destinoId: proceso.destinoId,
      fuenteId: proceso.fuenteId,
    });
  }

  async listarTodos(): Promise<ProcesoEntity[]> {
    return this.procesoRepository.find();
  }

  async listarPorOrganizacion(organizacionId: string): Promise<ProcesoEntity[]> {
    return this.procesoRepository.find({ where: { organizacionId } });
  }

  async obtenerPorId(id: string): Promise<ProcesoEntity | null> {
    return this.procesoRepository.findOne({ where: { id } });
  }

  async obtenerPorCodigo(codigo: string): Promise<ProcesoEntity | null> {
    return this.procesoRepository.findOne({ where: { codigo } });
  }

  async actualizar(id: string, data: Partial<ProcesoEntity>): Promise<ProcesoEntity | null> {
    await this.procesoRepository.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: string): Promise<void> {
    await this.procesoRepository.delete(id);
  }
}
