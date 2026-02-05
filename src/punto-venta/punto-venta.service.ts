import { Injectable } from '@nestjs/common';
import { CrearPuntoVentaUseCase } from './casos-de-uso/crear-punto-venta.use-case';
import { ListarPuntosVentaUseCase } from './casos-de-uso/listar-puntos-venta.use-case';
import { EditarPuntoVentaUseCase } from './casos-de-uso/editar-punto-venta.use-case';
import { EliminarPuntoVentaUseCase, EliminarPuntoVentaResponse } from './casos-de-uso/eliminar-punto-venta.use-case';
import { CrearPuntoVentaDto, ActualizarPuntoVentaDto } from './dtos';
import { PuntoVentaResponse } from './interfaces/punto-venta-response.interface';

@Injectable()
export class PuntoVentaService {
  constructor(
    private readonly crearPuntoVentaUseCase: CrearPuntoVentaUseCase,
    private readonly listarPuntosVentaUseCase: ListarPuntosVentaUseCase,
    private readonly editarPuntoVentaUseCase: EditarPuntoVentaUseCase,
    private readonly eliminarPuntoVentaUseCase: EliminarPuntoVentaUseCase,
  ) {}

  async crear(dto: CrearPuntoVentaDto): Promise<PuntoVentaResponse> {
    return this.crearPuntoVentaUseCase.execute(dto);
  }

  async listarTodos(organizacionId?: string): Promise<PuntoVentaResponse[]> {
    return this.listarPuntosVentaUseCase.execute(organizacionId);
  }

  async obtenerPorId(id: string): Promise<PuntoVentaResponse> {
    return this.listarPuntosVentaUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarPuntoVentaDto): Promise<PuntoVentaResponse> {
    return this.editarPuntoVentaUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarPuntoVentaResponse> {
    return this.eliminarPuntoVentaUseCase.execute(id);
  }
}
