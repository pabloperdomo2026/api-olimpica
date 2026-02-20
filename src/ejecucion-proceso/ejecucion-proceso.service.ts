import { Injectable } from '@nestjs/common';
import { ListarEjecucionesUseCase } from './casos-de-uso/listar-ejecuciones.use-case';
import { EjecucionProcesoResponse } from './interfaces/ejecucion-proceso-response.interface';

@Injectable()
export class EjecucionProcesoService {
  constructor(
    private readonly listarEjecucionesUseCase: ListarEjecucionesUseCase,
  ) {}

  async listarTodos(procesoId?: string): Promise<EjecucionProcesoResponse[]> {
    return this.listarEjecucionesUseCase.execute(procesoId);
  }

  async obtenerPorId(id: string): Promise<EjecucionProcesoResponse> {
    return this.listarEjecucionesUseCase.executeById(id);
  }
}
