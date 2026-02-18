import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { DestinoDatosService } from './destino-datos.service';
import { DestinoDatosResponse } from './interfaces/destino-datos-response.interface';
import { CrearDestinoDatosDto, ActualizarDestinoDatosDto } from './dtos';
import { EliminarDestinoDatosResponse } from './casos-de-uso/eliminar-destino-datos.use-case';

@ApiTags('Destino Datos')
@ApiBearerAuth()
@Controller('destinos-datos')
export class DestinoDatosController {
  constructor(private readonly service: DestinoDatosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear destino de datos' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearDestinoDatosDto): Promise<DestinoDatosResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar destinos de datos' })
  @ApiQuery({ name: 'organizacionId', required: false, description: 'Filtrar por organizacion' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(@Query('organizacionId') organizacionId?: string): Promise<DestinoDatosResponse[]> {
    return this.service.listarTodos(organizacionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener destino de datos por ID' })
  @ApiParam({ name: 'id', description: 'ID del destino de datos' })
  async obtenerPorId(@Param('id') id: string): Promise<DestinoDatosResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar destino de datos' })
  @ApiParam({ name: 'id', description: 'ID del destino de datos' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarDestinoDatosDto): Promise<DestinoDatosResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar destino de datos' })
  @ApiParam({ name: 'id', description: 'ID del destino de datos' })
  async eliminar(@Param('id') id: string): Promise<EliminarDestinoDatosResponse> {
    return this.service.eliminar(id);
  }
}
