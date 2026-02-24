import { Injectable } from '@nestjs/common';
import { CrearRecipienteCorreoUseCase } from './casos-de-uso/crear-recipiente-correo.use-case';
import { ListarRecipienteCorreoUseCase } from './casos-de-uso/listar-recipiente-correo.use-case';
import { ActualizarRecipienteCorreoUseCase } from './casos-de-uso/actualizar-recipiente-correo.use-case';
import { EliminarRecipienteCorreoUseCase, EliminarRecipienteCorreoResponse } from './casos-de-uso/eliminar-recipiente-correo.use-case';
import { CrearRecipienteCorreoDto, ActualizarRecipienteCorreoDto } from './dtos';
import { RecipienteCorreoResponse } from './interfaces/recipiente-correo-response.interface';

@Injectable()
export class RecipienteCorreoService {
  constructor(
    private readonly crearUseCase: CrearRecipienteCorreoUseCase,
    private readonly listarUseCase: ListarRecipienteCorreoUseCase,
    private readonly actualizarUseCase: ActualizarRecipienteCorreoUseCase,
    private readonly eliminarUseCase: EliminarRecipienteCorreoUseCase,
  ) {}

  async crear(dto: CrearRecipienteCorreoDto): Promise<RecipienteCorreoResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<RecipienteCorreoResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<RecipienteCorreoResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarRecipienteCorreoDto): Promise<RecipienteCorreoResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarRecipienteCorreoResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
