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
import { UsuarioRolService } from './usuario-rol.service';
import { RolResponse } from '../rol/interfaces/rol-response.interface';

@ApiTags('Usuario-Rol')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuarioRolController {
  constructor(private readonly usuarioRolService: UsuarioRolService) {}

  @Get(':usuarioId/roles')
  @ApiOperation({ summary: 'Listar roles de un usuario', description: 'Obtiene todos los roles asignados a un usuario' })
  @ApiParam({ name: 'usuarioId', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de roles del usuario' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async listarRoles(@Param('usuarioId') usuarioId: string): Promise<RolResponse[]> {
    return this.usuarioRolService.listarRolesPorUsuario(usuarioId);
  }

  @Post(':usuarioId/roles/:rolId')
  @ApiOperation({ summary: 'Asignar rol a usuario', description: 'Asigna un rol existente a un usuario' })
  @ApiParam({ name: 'usuarioId', description: 'ID del usuario' })
  @ApiParam({ name: 'rolId', description: 'ID del rol' })
  @ApiResponse({ status: 201, description: 'Rol asignado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario o rol no encontrado' })
  @ApiResponse({ status: 409, description: 'El usuario ya tiene ese rol' })
  async asignarRol(
    @Param('usuarioId') usuarioId: string,
    @Param('rolId') rolId: string,
  ): Promise<{ mensaje: string }> {
    return this.usuarioRolService.asignarRol(usuarioId, rolId);
  }

  @Delete(':usuarioId/roles/:rolId')
  @ApiOperation({ summary: 'Desasignar rol de usuario', description: 'Remueve un rol asignado a un usuario' })
  @ApiParam({ name: 'usuarioId', description: 'ID del usuario' })
  @ApiParam({ name: 'rolId', description: 'ID del rol' })
  @ApiResponse({ status: 200, description: 'Rol desasignado exitosamente' })
  @ApiResponse({ status: 404, description: 'Asignacion no encontrada' })
  async desasignarRol(
    @Param('usuarioId') usuarioId: string,
    @Param('rolId') rolId: string,
  ): Promise<{ mensaje: string }> {
    return this.usuarioRolService.desasignarRol(usuarioId, rolId);
  }
}
