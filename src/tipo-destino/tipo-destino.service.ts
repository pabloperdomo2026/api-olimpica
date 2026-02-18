import { Injectable } from '@nestjs/common';
import { CrearTipoDestinoUseCase } from './casos-de-uso/crear-tipo-destino.use-case';
import { ListarTipoDestinoUseCase } from './casos-de-uso/listar-tipo-destino.use-case';
import { ActualizarTipoDestinoUseCase } from './casos-de-uso/actualizar-tipo-destino.use-case';
import { EliminarTipoDestinoUseCase, EliminarTipoDestinoResponse } from './casos-de-uso/eliminar-tipo-destino.use-case';
import { CrearTipoDestinoDto, ActualizarTipoDestinoDto } from './dtos';
import { TipoDestinoResponse } from './interfaces/tipo-destino-response.interface';

@Injectable()
export class TipoDestinoService {
  constructor(
    private readonly crearUseCase: CrearTipoDestinoUseCase,
    private readonly listarUseCase: ListarTipoDestinoUseCase,
    private readonly actualizarUseCase: ActualizarTipoDestinoUseCase,
    private readonly eliminarUseCase: EliminarTipoDestinoUseCase,
  ) {}

  async crear(dto: CrearTipoDestinoDto): Promise<TipoDestinoResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<TipoDestinoResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<TipoDestinoResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarTipoDestinoDto): Promise<TipoDestinoResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarTipoDestinoResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
