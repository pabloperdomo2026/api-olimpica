import { Injectable } from '@nestjs/common';
import { CrearFuncionesSistemaUseCase } from './casos-de-uso/crear-funciones-sistema.use-case';
import { ListarFuncionesSistemaUseCase } from './casos-de-uso/listar-funciones-sistema.use-case';
import { ActualizarFuncionesSistemaUseCase } from './casos-de-uso/actualizar-funciones-sistema.use-case';
import { EliminarFuncionesSistemaUseCase, EliminarFuncionesSistemaResponse } from './casos-de-uso/eliminar-funciones-sistema.use-case';
import { CrearFuncionesSistemaDto, ActualizarFuncionesSistemaDto } from './dtos';
import { FuncionesSistemaResponse } from './interfaces/funciones-sistema-response.interface';

@Injectable()
export class FuncionesSistemaService {
  constructor(
    private readonly crearUseCase: CrearFuncionesSistemaUseCase,
    private readonly listarUseCase: ListarFuncionesSistemaUseCase,
    private readonly actualizarUseCase: ActualizarFuncionesSistemaUseCase,
    private readonly eliminarUseCase: EliminarFuncionesSistemaUseCase,
  ) {}

  async crear(dto: CrearFuncionesSistemaDto): Promise<FuncionesSistemaResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<FuncionesSistemaResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<FuncionesSistemaResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarFuncionesSistemaDto): Promise<FuncionesSistemaResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarFuncionesSistemaResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
