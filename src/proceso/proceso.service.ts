import { Injectable } from '@nestjs/common';
import { CrearProcesoUseCase } from './casos-de-uso/crear-proceso.use-case';
import { ListarProcesosUseCase } from './casos-de-uso/listar-procesos.use-case';
import { EditarProcesoUseCase } from './casos-de-uso/editar-proceso.use-case';
import { EliminarProcesoUseCase, EliminarProcesoResponse } from './casos-de-uso/eliminar-proceso.use-case';
import { CrearProcesoDto, ActualizarProcesoDto } from './dtos';
import { ProcesoResponse } from './interfaces/proceso-response.interface';

@Injectable()
export class ProcesoService {
  constructor(
    private readonly crearProcesoUseCase: CrearProcesoUseCase,
    private readonly listarProcesosUseCase: ListarProcesosUseCase,
    private readonly editarProcesoUseCase: EditarProcesoUseCase,
    private readonly eliminarProcesoUseCase: EliminarProcesoUseCase,
  ) {}

  async crear(dto: CrearProcesoDto): Promise<ProcesoResponse> {
    return this.crearProcesoUseCase.execute(dto);
  }

  async listarTodos(organizacionId?: string): Promise<ProcesoResponse[]> {
    return this.listarProcesosUseCase.execute(organizacionId);
  }

  async obtenerPorId(id: string): Promise<ProcesoResponse> {
    return this.listarProcesosUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarProcesoDto): Promise<ProcesoResponse> {
    return this.editarProcesoUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarProcesoResponse> {
    return this.eliminarProcesoUseCase.execute(id);
  }
}
