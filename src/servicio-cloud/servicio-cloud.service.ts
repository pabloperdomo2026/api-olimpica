import { Injectable } from '@nestjs/common';
import { CrearServicioCloudUseCase } from './casos-de-uso/crear-servicio-cloud.use-case';
import { ListarServiciosCloudUseCase } from './casos-de-uso/listar-servicios-cloud.use-case';
import { EditarServicioCloudUseCase } from './casos-de-uso/editar-servicio-cloud.use-case';
import { EliminarServicioCloudUseCase, EliminarServicioCloudResponse } from './casos-de-uso/eliminar-servicio-cloud.use-case';
import { CrearServicioCloudDto, ActualizarServicioCloudDto } from './dtos';
import { ServicioCloudResponse } from './interfaces/servicio-cloud-response.interface';

@Injectable()
export class ServicioCloudService {
  constructor(
    private readonly crearUseCase: CrearServicioCloudUseCase,
    private readonly listarUseCase: ListarServiciosCloudUseCase,
    private readonly editarUseCase: EditarServicioCloudUseCase,
    private readonly eliminarUseCase: EliminarServicioCloudUseCase,
  ) {}

  async crear(dto: CrearServicioCloudDto): Promise<ServicioCloudResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<ServicioCloudResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<ServicioCloudResponse> {
    return this.listarUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarServicioCloudDto): Promise<ServicioCloudResponse> {
    return this.editarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarServicioCloudResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
