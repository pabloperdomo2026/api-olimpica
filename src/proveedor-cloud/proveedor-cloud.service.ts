import { Injectable } from '@nestjs/common';
import { CrearProveedorCloudUseCase } from './casos-de-uso/crear-proveedor-cloud.use-case';
import { ListarProveedoresCloudUseCase } from './casos-de-uso/listar-proveedores-cloud.use-case';
import { EditarProveedorCloudUseCase } from './casos-de-uso/editar-proveedor-cloud.use-case';
import { EliminarProveedorCloudUseCase, EliminarProveedorCloudResponse } from './casos-de-uso/eliminar-proveedor-cloud.use-case';
import { CrearProveedorCloudDto, ActualizarProveedorCloudDto } from './dtos';
import { ProveedorCloudResponse } from './interfaces/proveedor-cloud-response.interface';

@Injectable()
export class ProveedorCloudService {
  constructor(
    private readonly crearUseCase: CrearProveedorCloudUseCase,
    private readonly listarUseCase: ListarProveedoresCloudUseCase,
    private readonly editarUseCase: EditarProveedorCloudUseCase,
    private readonly eliminarUseCase: EliminarProveedorCloudUseCase,
  ) {}

  async crear(dto: CrearProveedorCloudDto): Promise<ProveedorCloudResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(): Promise<ProveedorCloudResponse[]> {
    return this.listarUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<ProveedorCloudResponse> {
    return this.listarUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarProveedorCloudDto): Promise<ProveedorCloudResponse> {
    return this.editarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarProveedorCloudResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
