import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametrosGlobalesEntity } from './parametros-globales.entity';

@Injectable()
export class ParametrosGlobalesRepository {
  constructor(
    @InjectRepository(ParametrosGlobalesEntity)
    private readonly repository: Repository<ParametrosGlobalesEntity>,
  ) {}

  async crear(data: Partial<ParametrosGlobalesEntity>): Promise<ParametrosGlobalesEntity> {
    const entidad = this.repository.create(data);
    return this.repository.save(entidad);
  }

  async listarTodos(): Promise<ParametrosGlobalesEntity[]> {
    return this.repository.find({
      relations: ['organizacion'],
      order: { organizacionId: 'ASC', itemGrupo: 'ASC', itemAtributo: 'ASC' },
    });
  }

  async listarPorOrganizacion(organizacionId: string): Promise<ParametrosGlobalesEntity[]> {
    return this.repository.find({
      where: { organizacionId },
      relations: ['organizacion'],
      order: { itemGrupo: 'ASC', itemAtributo: 'ASC' },
    });
  }

  async obtenerPorClave(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
  ): Promise<ParametrosGlobalesEntity | null> {
    return this.repository.findOne({
      where: { organizacionId, itemGrupo, itemAtributo },
      relations: ['organizacion'],
    });
  }

  async actualizar(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
    data: Partial<ParametrosGlobalesEntity>,
  ): Promise<ParametrosGlobalesEntity | null> {
    await this.repository.update(
      { organizacionId, itemGrupo, itemAtributo },
      data,
    );
    return this.obtenerPorClave(organizacionId, itemGrupo, itemAtributo);
  }

  async eliminar(
    organizacionId: string,
    itemGrupo: string,
    itemAtributo: string,
  ): Promise<void> {
    await this.repository.delete({ organizacionId, itemGrupo, itemAtributo });
  }
}
