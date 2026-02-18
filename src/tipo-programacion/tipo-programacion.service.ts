import { Injectable } from '@nestjs/common';
import { CrearTipoProgramacionUseCase } from './casos-de-uso/crear-tipo-programacion.use-case';
import { ListarTipoProgramacionUseCase } from './casos-de-uso/listar-tipo-programacion.use-case';
import { ActualizarTipoProgramacionUseCase } from './casos-de-uso/actualizar-tipo-programacion.use-case';
import { EliminarTipoProgramacionUseCase, EliminarTipoProgramacionResponse } from './casos-de-uso/eliminar-tipo-programacion.use-case';
import { CrearTipoProgramacionDto, ActualizarTipoProgramacionDto } from './dtos';
import { TipoProgramacionResponse } from './interfaces/tipo-programacion-response.interface';

@Injectable()
export class TipoProgramacionService {
  constructor(
    private readonly crearUseCase: CrearTipoProgramacionUseCase,
    private readonly listarUseCase: ListarTipoProgramacionUseCase,
    private readonly actualizarUseCase: ActualizarTipoProgramacionUseCase,
    private readonly eliminarUseCase: EliminarTipoProgramacionUseCase,
  ) {}

  async crear(dto: CrearTipoProgramacionDto): Promise<TipoProgramacionResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<TipoProgramacionResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<TipoProgramacionResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarTipoProgramacionDto): Promise<TipoProgramacionResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarTipoProgramacionResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
