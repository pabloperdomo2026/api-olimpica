import { Injectable } from '@nestjs/common';
import { CrearCalendarioUseCase } from './casos-de-uso/crear-calendario.use-case';
import { ListarCalendariosUseCase } from './casos-de-uso/listar-calendarios.use-case';
import { EditarCalendarioUseCase } from './casos-de-uso/editar-calendario.use-case';
import { EliminarCalendarioUseCase, EliminarCalendarioResponse } from './casos-de-uso/eliminar-calendario.use-case';
import { CrearCalendarioDto, ActualizarCalendarioDto } from './dtos';
import { CalendarioResponse } from './interfaces/calendario-response.interface';

@Injectable()
export class CalendarioService {
  constructor(
    private readonly crearUseCase: CrearCalendarioUseCase,
    private readonly listarUseCase: ListarCalendariosUseCase,
    private readonly editarUseCase: EditarCalendarioUseCase,
    private readonly eliminarUseCase: EliminarCalendarioUseCase,
  ) {}

  async crear(dto: CrearCalendarioDto): Promise<CalendarioResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<CalendarioResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(fechaId: number): Promise<CalendarioResponse> {
    return this.listarUseCase.executeById(fechaId);
  }

  async editar(fechaId: number, dto: ActualizarCalendarioDto): Promise<CalendarioResponse> {
    return this.editarUseCase.execute(fechaId, dto);
  }

  async eliminar(fechaId: number): Promise<EliminarCalendarioResponse> {
    return this.eliminarUseCase.execute(fechaId);
  }
}
