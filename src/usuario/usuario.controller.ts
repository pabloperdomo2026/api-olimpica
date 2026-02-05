import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioResponse } from './interfaces';
import { CrearUsuarioDto, ActualizarUsuarioDto } from './dtos';
import { EliminarUsuarioResponse } from './casos-de-uso/eliminar-usuario.use-case';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crear(@Body() dto: CrearUsuarioDto): Promise<UsuarioResponse> {
    // TODO: obtener usuario desde token JWT
    const usuarioCreacion = 'admin@olimpica.com';
    return this.usuarioService.crear(dto, usuarioCreacion);
  }

  @Get()
  async listarTodos(
    @Query('organizacionId') organizacionId?: string,
  ): Promise<UsuarioResponse[]> {
    const orgId = organizacionId ? parseInt(organizacionId, 10) : undefined;
    return this.usuarioService.listarTodos(orgId);
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<UsuarioResponse> {
    return this.usuarioService.obtenerPorId(id);
  }

  @Put(':id')
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarUsuarioDto,
  ): Promise<UsuarioResponse> {
    // TODO: obtener usuario desde token JWT
    const usuarioModificacion = 'admin@olimpica.com';
    return this.usuarioService.editar(id, dto, usuarioModificacion);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<EliminarUsuarioResponse> {
    return this.usuarioService.eliminar(id);
  }
}
