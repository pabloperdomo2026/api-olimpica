import { Injectable } from '@nestjs/common';
import { CrearColumnaDestinoUseCase } from './casos-de-uso/crear-columna-destino.use-case';
import { ListarColumnaDestinoUseCase } from './casos-de-uso/listar-columna-destino.use-case';
import { ActualizarColumnaDestinoUseCase } from './casos-de-uso/actualizar-columna-destino.use-case';
import { EliminarColumnaDestinoUseCase, EliminarColumnaDestinoResponse } from './casos-de-uso/eliminar-columna-destino.use-case';
import { CrearColumnaDestinoDto, ActualizarColumnaDestinoDto } from './dtos';
import { ColumnaDestinoResponse } from './interfaces/columna-destino-response.interface';

@Injectable()
export class ColumnaDestinoService {
  constructor(
    private readonly crearUseCase: CrearColumnaDestinoUseCase,
    private readonly listarUseCase: ListarColumnaDestinoUseCase,
    private readonly actualizarUseCase: ActualizarColumnaDestinoUseCase,
    private readonly eliminarUseCase: EliminarColumnaDestinoUseCase,
  ) {}

  async crear(dto: CrearColumnaDestinoDto): Promise<ColumnaDestinoResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(destinoId?: string): Promise<ColumnaDestinoResponse[]> {
    return this.listarUseCase.execute(destinoId);
  }

  async obtenerPorId(id: string): Promise<ColumnaDestinoResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarColumnaDestinoDto): Promise<ColumnaDestinoResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarColumnaDestinoResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
