import { Injectable } from '@nestjs/common';
import { CrearTipoAlertaUseCase } from './casos-de-uso/crear-tipo-alerta.use-case';
import { ListarTipoAlertaUseCase } from './casos-de-uso/listar-tipo-alerta.use-case';
import { ActualizarTipoAlertaUseCase } from './casos-de-uso/actualizar-tipo-alerta.use-case';
import { EliminarTipoAlertaUseCase, EliminarTipoAlertaResponse } from './casos-de-uso/eliminar-tipo-alerta.use-case';
import { CrearTipoAlertaDto, ActualizarTipoAlertaDto } from './dtos';
import { TipoAlertaResponse } from './interfaces/tipo-alerta-response.interface';

@Injectable()
export class TipoAlertaService {
  constructor(
    private readonly crearUseCase: CrearTipoAlertaUseCase,
    private readonly listarUseCase: ListarTipoAlertaUseCase,
    private readonly actualizarUseCase: ActualizarTipoAlertaUseCase,
    private readonly eliminarUseCase: EliminarTipoAlertaUseCase,
  ) {}

  async crear(dto: CrearTipoAlertaDto): Promise<TipoAlertaResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<TipoAlertaResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<TipoAlertaResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarTipoAlertaDto): Promise<TipoAlertaResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarTipoAlertaResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
