import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../autenticacion/guards/jwt-auth.guard';
import { UsuarioService } from './usuario.service';
import { UsuarioResponse } from './interfaces/usuario-response.interface';
import { CrearUsuarioDto, ActualizarUsuarioDto } from './dtos';
import { EliminarUsuarioResponse } from './casos-de-uso/eliminar-usuario.use-case';

@ApiTags('Usuarios')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario', description: 'Crea un nuevo usuario en el sistema' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El email ya esta registrado' })
  async crear(@Body() dto: CrearUsuarioDto): Promise<UsuarioResponse> {
    return this.usuarioService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuarios', description: 'Obtiene todos los usuarios del sistema' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
  async listarTodos(): Promise<UsuarioResponse[]> {
    const organizacionId = '';
    return this.usuarioService.listarTodos(organizacionId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar usuario', description: 'Actualiza los datos de un usuario existente' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarUsuarioDto,
  ): Promise<UsuarioResponse> {
    return this.usuarioService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario', description: 'Elimina un usuario del sistema' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarUsuarioResponse> {
    return this.usuarioService.eliminar(id);
  }
}
