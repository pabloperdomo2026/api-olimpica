import { Injectable } from '@nestjs/common';
import { CrearDestinoDatosUseCase } from './casos-de-uso/crear-destino-datos.use-case';
import { ListarDestinoDatosUseCase } from './casos-de-uso/listar-destino-datos.use-case';
import { ActualizarDestinoDatosUseCase } from './casos-de-uso/actualizar-destino-datos.use-case';
import { EliminarDestinoDatosUseCase, EliminarDestinoDatosResponse } from './casos-de-uso/eliminar-destino-datos.use-case';
import { CrearDestinoDatosDto, ActualizarDestinoDatosDto } from './dtos';
import { DestinoDatosResponse } from './interfaces/destino-datos-response.interface';

@Injectable()
export class DestinoDatosService {
  constructor(
    private readonly crearUseCase: CrearDestinoDatosUseCase,
    private readonly listarUseCase: ListarDestinoDatosUseCase,
    private readonly actualizarUseCase: ActualizarDestinoDatosUseCase,
    private readonly eliminarUseCase: EliminarDestinoDatosUseCase,
  ) {}

  async crear(dto: CrearDestinoDatosDto): Promise<DestinoDatosResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(organizacionId?: string): Promise<DestinoDatosResponse[]> {
    return this.listarUseCase.execute(organizacionId);
  }

  async obtenerPorId(id: string): Promise<DestinoDatosResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarDestinoDatosDto): Promise<DestinoDatosResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarDestinoDatosResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
