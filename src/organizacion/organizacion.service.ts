import { Injectable } from '@nestjs/common';
import { CrearOrganizacionUseCase } from './casos-de-uso/crear-organizacion.use-case';
import { ListarOrganizacionesUseCase } from './casos-de-uso/listar-organizaciones.use-case';
import { EditarOrganizacionUseCase } from './casos-de-uso/editar-organizacion.use-case';
import { EliminarOrganizacionUseCase, EliminarOrganizacionResponse } from './casos-de-uso/eliminar-organizacion.use-case';
import { CrearOrganizacionDto, ActualizarOrganizacionDto } from './dtos';
import { OrganizacionResponse } from './interfaces/organizacion-response.interface';

@Injectable()
export class OrganizacionService {
  constructor(
    private readonly crearOrganizacionUseCase: CrearOrganizacionUseCase,
    private readonly listarOrganizacionesUseCase: ListarOrganizacionesUseCase,
    private readonly editarOrganizacionUseCase: EditarOrganizacionUseCase,
    private readonly eliminarOrganizacionUseCase: EliminarOrganizacionUseCase,
  ) {}

  async crear(dto: CrearOrganizacionDto): Promise<OrganizacionResponse> {
    return this.crearOrganizacionUseCase.execute(dto);
  }

  async listarTodos(): Promise<OrganizacionResponse[]> {
    return this.listarOrganizacionesUseCase.execute();
  }

  async obtenerPorId(id: string): Promise<OrganizacionResponse> {
    return this.listarOrganizacionesUseCase.executeById(id);
  }

  async editar(id: string, dto: ActualizarOrganizacionDto): Promise<OrganizacionResponse> {
    return this.editarOrganizacionUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarOrganizacionResponse> {
    return this.eliminarOrganizacionUseCase.execute(id);
  }
}
