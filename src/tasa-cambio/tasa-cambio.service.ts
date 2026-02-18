import { Injectable } from '@nestjs/common';
import { CrearTasaCambioUseCase } from './casos-de-uso/crear-tasa-cambio.use-case';
import { ListarTasaCambioUseCase } from './casos-de-uso/listar-tasa-cambio.use-case';
import { ActualizarTasaCambioUseCase } from './casos-de-uso/actualizar-tasa-cambio.use-case';
import { EliminarTasaCambioUseCase, EliminarTasaCambioResponse } from './casos-de-uso/eliminar-tasa-cambio.use-case';
import { CrearTasaCambioDto, ActualizarTasaCambioDto } from './dtos';
import { TasaCambioResponse } from './interfaces/tasa-cambio-response.interface';

@Injectable()
export class TasaCambioService {
  constructor(
    private readonly crearUseCase: CrearTasaCambioUseCase,
    private readonly listarUseCase: ListarTasaCambioUseCase,
    private readonly actualizarUseCase: ActualizarTasaCambioUseCase,
    private readonly eliminarUseCase: EliminarTasaCambioUseCase,
  ) {}

  async crear(dto: CrearTasaCambioDto): Promise<TasaCambioResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<TasaCambioResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: number): Promise<TasaCambioResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: number, dto: ActualizarTasaCambioDto): Promise<TasaCambioResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: number): Promise<EliminarTasaCambioResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
