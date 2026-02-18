import { Injectable } from '@nestjs/common';
import { CrearTipoFuenteUseCase } from './casos-de-uso/crear-tipo-fuente.use-case';
import { ListarTipoFuenteUseCase } from './casos-de-uso/listar-tipo-fuente.use-case';
import { ActualizarTipoFuenteUseCase } from './casos-de-uso/actualizar-tipo-fuente.use-case';
import { EliminarTipoFuenteUseCase, EliminarTipoFuenteResponse } from './casos-de-uso/eliminar-tipo-fuente.use-case';
import { CrearTipoFuenteDto, ActualizarTipoFuenteDto } from './dtos';
import { TipoFuenteResponse } from './interfaces/tipo-fuente-response.interface';

@Injectable()
export class TipoFuenteService {
  constructor(
    private readonly crearUseCase: CrearTipoFuenteUseCase,
    private readonly listarUseCase: ListarTipoFuenteUseCase,
    private readonly actualizarUseCase: ActualizarTipoFuenteUseCase,
    private readonly eliminarUseCase: EliminarTipoFuenteUseCase,
  ) {}

  async crear(dto: CrearTipoFuenteDto): Promise<TipoFuenteResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<TipoFuenteResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<TipoFuenteResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarTipoFuenteDto): Promise<TipoFuenteResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarTipoFuenteResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
