import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearProcesoMapeoCampoUseCase } from './casos-de-uso/crear-proceso-mapeo-campo.use-case';
import { ListarProcesoMapeoCampoUseCase } from './casos-de-uso/listar-proceso-mapeo-campo.use-case';
import { ActualizarProcesoMapeoCampoUseCase } from './casos-de-uso/actualizar-proceso-mapeo-campo.use-case';
import { EliminarProcesoMapeoCampoUseCase, EliminarProcesoMapeoCampoResponse } from './casos-de-uso/eliminar-proceso-mapeo-campo.use-case';
import { ProcesoMapeoCampoRepository } from './proceso-mapeo-campo.repository';
import { ProcesoMapeoCampoResponse } from './interfaces/proceso-mapeo-campo-response.interface';
import { procesoMapeoCampoMapper } from './mappers/proceso-mapeo-campo.mapper';
import { CrearProcesoMapeoCampoDto, ActualizarProcesoMapeoCampoDto } from './dtos';

@Injectable()
export class ProcesoMapeoCampoService {
  constructor(
    private readonly crearUseCase: CrearProcesoMapeoCampoUseCase,
    private readonly listarUseCase: ListarProcesoMapeoCampoUseCase,
    private readonly actualizarUseCase: ActualizarProcesoMapeoCampoUseCase,
    private readonly eliminarUseCase: EliminarProcesoMapeoCampoUseCase,
    private readonly repository: ProcesoMapeoCampoRepository,
  ) {}

  async crear(dto: CrearProcesoMapeoCampoDto): Promise<ProcesoMapeoCampoResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(procesoId?: string): Promise<ProcesoMapeoCampoResponse[]> {
    return this.listarUseCase.execute(procesoId);
  }

  async obtenerPorId(id: string): Promise<ProcesoMapeoCampoResponse> {
    const entidad = await this.repository.obtenerPorId(id);
    if (!entidad) {
      throw new NotFoundException(`Mapeo de campo con id ${id} no encontrado`);
    }
    return procesoMapeoCampoMapper(entidad);
  }

  async actualizar(id: string, dto: ActualizarProcesoMapeoCampoDto): Promise<ProcesoMapeoCampoResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarProcesoMapeoCampoResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
