import { Injectable } from '@nestjs/common';
import { ListarProgramacionesUseCase } from './casos-de-uso/listar-programaciones.use-case';
import { CrearProgramacionUseCase } from './casos-de-uso/crear-programacion.use-case';
import { ActualizarProgramacionUseCase } from './casos-de-uso/actualizar-programacion.use-case';
import { EliminarProgramacionUseCase, EliminarProgramacionResponse } from './casos-de-uso/eliminar-programacion.use-case';
import { CrearProgramacionDto, ActualizarProgramacionDto } from './dtos';
import { ProgramacionResponse } from './interfaces/programacion-response.interface';

@Injectable()
export class ProgramacionCrudService {
  constructor(
    private readonly listarUseCase: ListarProgramacionesUseCase,
    private readonly crearUseCase: CrearProgramacionUseCase,
    private readonly actualizarUseCase: ActualizarProgramacionUseCase,
    private readonly eliminarUseCase: EliminarProgramacionUseCase,
  ) {}

  async listarTodos(): Promise<ProgramacionResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<ProgramacionResponse> {
    return this.listarUseCase.executeById(id);
  }

  async crear(dto: CrearProgramacionDto): Promise<ProgramacionResponse> {
    return this.crearUseCase.execute(dto);
  }

  async actualizar(id: string, dto: ActualizarProgramacionDto): Promise<ProgramacionResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarProgramacionResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
