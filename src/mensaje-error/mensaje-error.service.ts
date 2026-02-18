import { Injectable } from '@nestjs/common';
import { CrearMensajeErrorUseCase } from './casos-de-uso/crear-mensaje-error.use-case';
import { ListarMensajeErrorUseCase } from './casos-de-uso/listar-mensaje-error.use-case';
import { ActualizarMensajeErrorUseCase } from './casos-de-uso/actualizar-mensaje-error.use-case';
import { EliminarMensajeErrorUseCase, EliminarMensajeErrorResponse } from './casos-de-uso/eliminar-mensaje-error.use-case';
import { CrearMensajeErrorDto, ActualizarMensajeErrorDto } from './dtos';
import { MensajeErrorResponse } from './interfaces/mensaje-error-response.interface';

@Injectable()
export class MensajeErrorService {
  constructor(
    private readonly crearUseCase: CrearMensajeErrorUseCase,
    private readonly listarUseCase: ListarMensajeErrorUseCase,
    private readonly actualizarUseCase: ActualizarMensajeErrorUseCase,
    private readonly eliminarUseCase: EliminarMensajeErrorUseCase,
  ) {}

  async crear(dto: CrearMensajeErrorDto): Promise<MensajeErrorResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<MensajeErrorResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<MensajeErrorResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarMensajeErrorDto): Promise<MensajeErrorResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarMensajeErrorResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
