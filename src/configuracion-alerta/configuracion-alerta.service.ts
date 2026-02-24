import { Injectable } from '@nestjs/common';
import { CrearConfiguracionAlertaUseCase } from './casos-de-uso/crear-configuracion-alerta.use-case';
import { ListarConfiguracionAlertaUseCase } from './casos-de-uso/listar-configuracion-alerta.use-case';
import { ActualizarConfiguracionAlertaUseCase } from './casos-de-uso/actualizar-configuracion-alerta.use-case';
import { EliminarConfiguracionAlertaUseCase, EliminarConfiguracionAlertaResponse } from './casos-de-uso/eliminar-configuracion-alerta.use-case';
import { CrearConfiguracionAlertaDto, ActualizarConfiguracionAlertaDto } from './dtos';
import { ConfiguracionAlertaResponse } from './interfaces/configuracion-alerta-response.interface';

@Injectable()
export class ConfiguracionAlertaService {
  constructor(
    private readonly crearUseCase: CrearConfiguracionAlertaUseCase,
    private readonly listarUseCase: ListarConfiguracionAlertaUseCase,
    private readonly actualizarUseCase: ActualizarConfiguracionAlertaUseCase,
    private readonly eliminarUseCase: EliminarConfiguracionAlertaUseCase,
  ) {}

  async crear(dto: CrearConfiguracionAlertaDto): Promise<ConfiguracionAlertaResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<ConfiguracionAlertaResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<ConfiguracionAlertaResponse> {
    return this.listarUseCase.executeById(id);
  }

  async actualizar(id: string, dto: ActualizarConfiguracionAlertaDto): Promise<ConfiguracionAlertaResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarConfiguracionAlertaResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
