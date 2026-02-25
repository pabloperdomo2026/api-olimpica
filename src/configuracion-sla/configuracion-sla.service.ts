import { Injectable } from '@nestjs/common';
import { CrearConfiguracionSlaUseCase } from './casos-de-uso/crear-configuracion-sla.use-case';
import { ListarConfiguracionSlaUseCase } from './casos-de-uso/listar-configuracion-sla.use-case';
import { ActualizarConfiguracionSlaUseCase } from './casos-de-uso/actualizar-configuracion-sla.use-case';
import { EliminarConfiguracionSlaUseCase, EliminarConfiguracionSlaResponse } from './casos-de-uso/eliminar-configuracion-sla.use-case';
import { CrearConfiguracionSlaDto, ActualizarConfiguracionSlaDto } from './dtos';
import { ConfiguracionSlaResponse } from './interfaces/configuracion-sla-response.interface';

@Injectable()
export class ConfiguracionSlaService {
  constructor(
    private readonly crearUseCase: CrearConfiguracionSlaUseCase,
    private readonly listarUseCase: ListarConfiguracionSlaUseCase,
    private readonly actualizarUseCase: ActualizarConfiguracionSlaUseCase,
    private readonly eliminarUseCase: EliminarConfiguracionSlaUseCase,
  ) {}

  async crear(dto: CrearConfiguracionSlaDto): Promise<ConfiguracionSlaResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<ConfiguracionSlaResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<ConfiguracionSlaResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarConfiguracionSlaDto): Promise<ConfiguracionSlaResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarConfiguracionSlaResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
