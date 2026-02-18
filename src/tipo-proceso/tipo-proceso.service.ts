import { Injectable } from '@nestjs/common';
import { CrearTipoProcesoUseCase } from './casos-de-uso/crear-tipo-proceso.use-case';
import { ListarTipoProcesoUseCase } from './casos-de-uso/listar-tipo-proceso.use-case';
import { ActualizarTipoProcesoUseCase } from './casos-de-uso/actualizar-tipo-proceso.use-case';
import { EliminarTipoProcesoUseCase, EliminarTipoProcesoResponse } from './casos-de-uso/eliminar-tipo-proceso.use-case';
import { CrearTipoProcesoDto, ActualizarTipoProcesoDto } from './dtos';
import { TipoProcesoResponse } from './interfaces/tipo-proceso-response.interface';

@Injectable()
export class TipoProcesoService {
  constructor(
    private readonly crearUseCase: CrearTipoProcesoUseCase,
    private readonly listarUseCase: ListarTipoProcesoUseCase,
    private readonly actualizarUseCase: ActualizarTipoProcesoUseCase,
    private readonly eliminarUseCase: EliminarTipoProcesoUseCase,
  ) {}

  async crear(dto: CrearTipoProcesoDto): Promise<TipoProcesoResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<TipoProcesoResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<TipoProcesoResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarTipoProcesoDto): Promise<TipoProcesoResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarTipoProcesoResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
