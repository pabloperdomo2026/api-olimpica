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
import { PermisoService } from './permiso.service';
import { PermisoResponse } from './interfaces/permiso-response.interface';
import { CrearPermisoDto, ActualizarPermisoDto } from './dtos';
import { EliminarPermisoResponse } from './casos-de-uso/eliminar-permiso.use-case';

@ApiTags('Permisos')
@ApiBearerAuth()
@Controller('permisos')
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear permiso', description: 'Crea un nuevo permiso en el sistema' })
  @ApiResponse({ status: 201, description: 'Permiso creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearPermisoDto): Promise<PermisoResponse> {
    return this.permisoService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar permisos', description: 'Obtiene todos los permisos del sistema' })
  @ApiResponse({ status: 200, description: 'Lista de permisos obtenida exitosamente' })
  async listarTodos(): Promise<PermisoResponse[]> {
    return this.permisoService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener permiso por ID', description: 'Obtiene un permiso especifico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del permiso' })
  @ApiResponse({ status: 200, description: 'Permiso encontrado' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<PermisoResponse> {
    return this.permisoService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar permiso', description: 'Actualiza los datos de un permiso existente' })
  @ApiParam({ name: 'id', description: 'ID del permiso' })
  @ApiResponse({ status: 200, description: 'Permiso actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarPermisoDto,
  ): Promise<PermisoResponse> {
    return this.permisoService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar permiso', description: 'Elimina un permiso del sistema' })
  @ApiParam({ name: 'id', description: 'ID del permiso' })
  @ApiResponse({ status: 200, description: 'Permiso eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarPermisoResponse> {
    return this.permisoService.eliminar(id);
  }
}
