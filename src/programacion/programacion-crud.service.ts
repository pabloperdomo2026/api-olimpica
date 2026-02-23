import { Injectable } from '@nestjs/common';
import { ListarProgramacionesUseCase } from './casos-de-uso/listar-programaciones.use-case';
import { CrearProgramacionUseCase } from './casos-de-uso/crear-programacion.use-case';
import { ActualizarProgramacionUseCase } from './casos-de-uso/actualizar-programacion.use-case';
import { EliminarProgramacionUseCase, EliminarProgramacionResponse } from './casos-de-uso/eliminar-programacion.use-case';
import { CrearProgramacionDto, ActualizarProgramacionDto } from './dtos';
import { ProgramacionResponse } from './interfaces/programacion-response.interface';
import { ProgramacionService } from './programacion.service';

@Injectable()
export class ProgramacionCrudService {
  constructor(
    private readonly listarUseCase: ListarProgramacionesUseCase,
    private readonly crearUseCase: CrearProgramacionUseCase,
    private readonly actualizarUseCase: ActualizarProgramacionUseCase,
    private readonly eliminarUseCase: EliminarProgramacionUseCase,
    private readonly programacionService: ProgramacionService,
  ) {}

  async listarTodos(): Promise<ProgramacionResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<ProgramacionResponse> {
    return this.listarUseCase.executeById(id);
  }

  async crear(dto: CrearProgramacionDto): Promise<ProgramacionResponse> {
    const resultado = await this.crearUseCase.execute(dto);
    if (resultado.proceso) {
      this.programacionService.sincronizarJob(
        resultado.id,
        resultado.nombre,
        resultado.expresionCron,
        resultado.activo,
        resultado.proceso.id,
      );
    }
    return resultado;
  }

  async actualizar(id: string, dto: ActualizarProgramacionDto): Promise<ProgramacionResponse> {
    const resultado = await this.actualizarUseCase.execute(id, dto);
    if (resultado.proceso) {
      this.programacionService.sincronizarJob(
        resultado.id,
        resultado.nombre,
        resultado.expresionCron,
        resultado.activo,
        resultado.proceso.id,
      );
    }
    return resultado;
  }

  async eliminar(id: string): Promise<EliminarProgramacionResponse> {
    const resultado = await this.eliminarUseCase.execute(id);
    this.programacionService.eliminarJob(id);
    return resultado;
  }
}
