import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolPermisoService } from './rol-permiso.service';
import { PermisoResponse } from '../permiso/interfaces/permiso-response.interface';

@ApiTags('Rol-Permiso')
@ApiBearerAuth()
@Controller('roles')
export class RolPermisoController {
  constructor(private readonly rolPermisoService: RolPermisoService) {}

  @Get(':rolId/permisos')
  @ApiOperation({ summary: 'Listar permisos de un rol', description: 'Obtiene todos los permisos asignados a un rol' })
  @ApiParam({ name: 'rolId', description: 'ID del rol' })
  @ApiResponse({ status: 200, description: 'Lista de permisos del rol' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async listarPermisos(@Param('rolId') rolId: string): Promise<PermisoResponse[]> {
    return this.rolPermisoService.listarPermisosPorRol(rolId);
  }

  @Post(':rolId/permisos/:permisoId')
  @ApiOperation({ summary: 'Asignar permiso a rol', description: 'Asigna un permiso existente a un rol' })
  @ApiParam({ name: 'rolId', description: 'ID del rol' })
  @ApiParam({ name: 'permisoId', description: 'ID del permiso' })
  @ApiResponse({ status: 201, description: 'Permiso asignado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol o permiso no encontrado' })
  @ApiResponse({ status: 409, description: 'El rol ya tiene ese permiso' })
  async asignarPermiso(
    @Param('rolId') rolId: string,
    @Param('permisoId') permisoId: string,
  ): Promise<{ mensaje: string }> {
    return this.rolPermisoService.asignarPermiso(rolId, permisoId);
  }

  @Delete(':rolId/permisos/:permisoId')
  @ApiOperation({ summary: 'Desasignar permiso de rol', description: 'Remueve un permiso asignado a un rol' })
  @ApiParam({ name: 'rolId', description: 'ID del rol' })
  @ApiParam({ name: 'permisoId', description: 'ID del permiso' })
  @ApiResponse({ status: 200, description: 'Permiso desasignado exitosamente' })
  @ApiResponse({ status: 404, description: 'Asignacion no encontrada' })
  async desasignarPermiso(
    @Param('rolId') rolId: string,
    @Param('permisoId') permisoId: string,
  ): Promise<{ mensaje: string }> {
    return this.rolPermisoService.desasignarPermiso(rolId, permisoId);
  }
}
