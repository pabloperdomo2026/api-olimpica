import { Injectable } from '@nestjs/common';
import { CrearColumnaOrigenUseCase } from './casos-de-uso/crear-columna-origen.use-case';
import { ListarColumnaOrigenUseCase } from './casos-de-uso/listar-columna-origen.use-case';
import { ActualizarColumnaOrigenUseCase } from './casos-de-uso/actualizar-columna-origen.use-case';
import { EliminarColumnaOrigenUseCase, EliminarColumnaOrigenResponse } from './casos-de-uso/eliminar-columna-origen.use-case';
import { ColumnaOrigenResponse } from './interfaces/columna-origen-response.interface';
import { CrearColumnaOrigenDto, ActualizarColumnaOrigenDto } from './dtos';

@Injectable()
export class ColumnaOrigenService {
  constructor(
    private readonly crearUseCase: CrearColumnaOrigenUseCase,
    private readonly listarUseCase: ListarColumnaOrigenUseCase,
    private readonly actualizarUseCase: ActualizarColumnaOrigenUseCase,
    private readonly eliminarUseCase: EliminarColumnaOrigenUseCase,
  ) {}

  async crear(dto: CrearColumnaOrigenDto): Promise<ColumnaOrigenResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(fuenteId?: string): Promise<ColumnaOrigenResponse[]> {
    return this.listarUseCase.execute(fuenteId);
  }

  async obtenerPorId(id: string): Promise<ColumnaOrigenResponse> {
    const lista = await this.listarUseCase.execute();
    const encontrado = lista.find((c) => c.id === id);
    if (!encontrado) {
      const { HttpException, HttpStatus } = await import('@nestjs/common');
      throw new HttpException({ description: 'Columna origen no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return encontrado;
  }

  async actualizar(id: string, dto: ActualizarColumnaOrigenDto): Promise<ColumnaOrigenResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarColumnaOrigenResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
