import { Injectable } from '@nestjs/common';
import { CrearMonedaUseCase } from './casos-de-uso/crear-moneda.use-case';
import { ListarMonedasUseCase } from './casos-de-uso/listar-monedas.use-case';
import { EditarMonedaUseCase } from './casos-de-uso/editar-moneda.use-case';
import { EliminarMonedaUseCase, EliminarMonedaResponse } from './casos-de-uso/eliminar-moneda.use-case';
import { CrearMonedaDto, ActualizarMonedaDto } from './dtos';
import { MonedaResponse } from './interfaces/moneda-response.interface';

@Injectable()
export class MonedaService {
  constructor(
    private readonly crearMonedaUseCase: CrearMonedaUseCase,
    private readonly listarMonedasUseCase: ListarMonedasUseCase,
    private readonly editarMonedaUseCase: EditarMonedaUseCase,
    private readonly eliminarMonedaUseCase: EliminarMonedaUseCase,
  ) {}

  async crear(dto: CrearMonedaDto): Promise<MonedaResponse> {
    return this.crearMonedaUseCase.execute(dto);
  }

  async listarTodos(): Promise<MonedaResponse[]> {
    return this.listarMonedasUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<MonedaResponse> {
    return this.listarMonedasUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarMonedaDto): Promise<MonedaResponse> {
    return this.editarMonedaUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarMonedaResponse> {
    return this.eliminarMonedaUseCase.execute(id);
  }
}
