import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolService } from './rol.service';
import { RolResponse } from './interfaces/rol-response.interface';
import { CrearRolDto, ActualizarRolDto } from './dtos';
import { EliminarRolResponse } from './casos-de-uso/eliminar-rol.use-case';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  @ApiOperation({ summary: 'Crear rol', description: 'Crea un nuevo rol en el sistema' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearRolDto): Promise<RolResponse> {
    return this.rolService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles', description: 'Obtiene todos los roles del sistema' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida exitosamente' })
  async listarTodos(): Promise<RolResponse[]> {
    return this.rolService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener rol por ID', description: 'Obtiene un rol especifico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del rol' })
  @ApiResponse({ status: 200, description: 'Rol encontrado' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<RolResponse> {
    return this.rolService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar rol', description: 'Actualiza los datos de un rol existente' })
  @ApiParam({ name: 'id', description: 'ID del rol' })
  @ApiResponse({ status: 200, description: 'Rol actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarRolDto,
  ): Promise<RolResponse> {
    return this.rolService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar rol', description: 'Elimina un rol del sistema' })
  @ApiParam({ name: 'id', description: 'ID del rol' })
  @ApiResponse({ status: 200, description: 'Rol eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarRolResponse> {
    return this.rolService.eliminar(id);
  }
}
