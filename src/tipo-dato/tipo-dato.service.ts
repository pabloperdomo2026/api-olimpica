import { Injectable } from '@nestjs/common';
import { CrearTipoDatoUseCase } from './casos-de-uso/crear-tipo-dato.use-case';
import { ListarTipoDatoUseCase } from './casos-de-uso/listar-tipo-dato.use-case';
import { ActualizarTipoDatoUseCase } from './casos-de-uso/actualizar-tipo-dato.use-case';
import { EliminarTipoDatoUseCase, EliminarTipoDatoResponse } from './casos-de-uso/eliminar-tipo-dato.use-case';
import { CrearTipoDatoDto, ActualizarTipoDatoDto } from './dtos';
import { TipoDatoResponse } from './interfaces/tipo-dato-response.interface';

@Injectable()
export class TipoDatoService {
  constructor(
    private readonly crearUseCase: CrearTipoDatoUseCase,
    private readonly listarUseCase: ListarTipoDatoUseCase,
    private readonly actualizarUseCase: ActualizarTipoDatoUseCase,
    private readonly eliminarUseCase: EliminarTipoDatoUseCase,
  ) {}

  async crear(dto: CrearTipoDatoDto): Promise<TipoDatoResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<TipoDatoResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<TipoDatoResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarTipoDatoDto): Promise<TipoDatoResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarTipoDatoResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
