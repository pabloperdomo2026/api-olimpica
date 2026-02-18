import { Injectable } from '@nestjs/common';
import { CrearEstadoProcesoUseCase } from './casos-de-uso/crear-estado-proceso.use-case';
import { ListarEstadoProcesoUseCase } from './casos-de-uso/listar-estado-proceso.use-case';
import { ActualizarEstadoProcesoUseCase } from './casos-de-uso/actualizar-estado-proceso.use-case';
import { EliminarEstadoProcesoUseCase, EliminarEstadoProcesoResponse } from './casos-de-uso/eliminar-estado-proceso.use-case';
import { CrearEstadoProcesoDto, ActualizarEstadoProcesoDto } from './dtos';
import { EstadoProcesoResponse } from './interfaces/estado-proceso-response.interface';

@Injectable()
export class EstadoProcesoService {
  constructor(
    private readonly crearUseCase: CrearEstadoProcesoUseCase,
    private readonly listarUseCase: ListarEstadoProcesoUseCase,
    private readonly actualizarUseCase: ActualizarEstadoProcesoUseCase,
    private readonly eliminarUseCase: EliminarEstadoProcesoUseCase,
  ) {}

  async crear(dto: CrearEstadoProcesoDto): Promise<EstadoProcesoResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<EstadoProcesoResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<EstadoProcesoResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarEstadoProcesoDto): Promise<EstadoProcesoResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarEstadoProcesoResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
