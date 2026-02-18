import { Injectable } from '@nestjs/common';
import { CrearNivelCriticidadUseCase } from './casos-de-uso/crear-nivel-criticidad.use-case';
import { ListarNivelCriticidadUseCase } from './casos-de-uso/listar-nivel-criticidad.use-case';
import { ActualizarNivelCriticidadUseCase } from './casos-de-uso/actualizar-nivel-criticidad.use-case';
import { EliminarNivelCriticidadUseCase, EliminarNivelCriticidadResponse } from './casos-de-uso/eliminar-nivel-criticidad.use-case';
import { CrearNivelCriticidadDto, ActualizarNivelCriticidadDto } from './dtos';
import { NivelCriticidadResponse } from './interfaces/nivel-criticidad-response.interface';

@Injectable()
export class NivelCriticidadService {
  constructor(
    private readonly crearUseCase: CrearNivelCriticidadUseCase,
    private readonly listarUseCase: ListarNivelCriticidadUseCase,
    private readonly actualizarUseCase: ActualizarNivelCriticidadUseCase,
    private readonly eliminarUseCase: EliminarNivelCriticidadUseCase,
  ) {}

  async crear(dto: CrearNivelCriticidadDto): Promise<NivelCriticidadResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<NivelCriticidadResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<NivelCriticidadResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarNivelCriticidadDto): Promise<NivelCriticidadResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarNivelCriticidadResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
