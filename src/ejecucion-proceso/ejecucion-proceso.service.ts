import { Injectable } from '@nestjs/common';
import { ListarEjecucionesUseCase } from './casos-de-uso/listar-ejecuciones.use-case';
import { CrearEjecucionUseCase } from './casos-de-uso/crear-ejecucion.use-case';
import { CrearEventoEjecucionUseCase } from './casos-de-uso/crear-evento-ejecucion.use-case';
import { FinalizarEventoEjecucionUseCase } from './casos-de-uso/finalizar-evento-ejecucion.use-case';
import { ObtenerDashboardUseCase } from './casos-de-uso/obtener-dashboard.use-case';
import { CrearEjecucionProcesoDto, CrearEventoEjecucionDto } from './dtos';
import { EjecucionProcesoResponse } from './interfaces/ejecucion-proceso-response.interface';
import { DashboardResponse } from './interfaces/dashboard-response.interface';

@Injectable()
export class EjecucionProcesoService {
  constructor(
    private readonly listarEjecucionesUseCase: ListarEjecucionesUseCase,
    private readonly crearEjecucionUseCase: CrearEjecucionUseCase,
    private readonly crearEventoEjecucionUseCase: CrearEventoEjecucionUseCase,
    private readonly finalizarEventoEjecucionUseCase: FinalizarEventoEjecucionUseCase,
    private readonly obtenerDashboardUseCase: ObtenerDashboardUseCase,
  ) {}

  async listarTodos(procesoId?: string): Promise<EjecucionProcesoResponse[]> {
    return this.listarEjecucionesUseCase.execute(procesoId);
  }

  async obtenerPorId(id: string): Promise<EjecucionProcesoResponse> {
    return this.listarEjecucionesUseCase.executeById(id);
  }

  async crear(dto: CrearEjecucionProcesoDto): Promise<EjecucionProcesoResponse> {
    return this.crearEjecucionUseCase.execute(dto);
  }

  async registrarEvento(dto: CrearEventoEjecucionDto): Promise<EjecucionProcesoResponse> {
    return this.crearEventoEjecucionUseCase.execute(dto);
  }

  async finalizarEvento(dto: any): Promise<any> {
    return this.finalizarEventoEjecucionUseCase.execute(dto);
  }

  async obtenerDashboard(): Promise<DashboardResponse> {
    return this.obtenerDashboardUseCase.execute();
  }
}
