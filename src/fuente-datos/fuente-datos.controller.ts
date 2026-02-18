import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { FuenteDatosService } from './fuente-datos.service';
import { FuenteDatosResponse } from './interfaces/fuente-datos-response.interface';
import { CrearFuenteDatosDto, ActualizarFuenteDatosDto } from './dtos';
import { EliminarFuenteDatosResponse } from './casos-de-uso/eliminar-fuente-datos.use-case';

@ApiTags('Fuente de Datos')
@ApiBearerAuth()
@Controller('fuentes-datos')
export class FuenteDatosController {
  constructor(private readonly service: FuenteDatosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear fuente de datos' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  async crear(@Body() dto: CrearFuenteDatosDto): Promise<FuenteDatosResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar fuentes de datos' })
  @ApiQuery({ name: 'organizacionId', required: false, description: 'Filtrar por organización' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(@Query('organizacionId') organizacionId?: string): Promise<FuenteDatosResponse[]> {
    return this.service.listarTodos(organizacionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener fuente de datos por ID' })
  @ApiParam({ name: 'id', description: 'ID de la fuente de datos' })
  async obtenerPorId(@Param('id') id: string): Promise<FuenteDatosResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar fuente de datos' })
  @ApiParam({ name: 'id', description: 'ID de la fuente de datos' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarFuenteDatosDto): Promise<FuenteDatosResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar fuente de datos' })
  @ApiParam({ name: 'id', description: 'ID de la fuente de datos' })
  async eliminar(@Param('id') id: string): Promise<EliminarFuenteDatosResponse> {
    return this.service.eliminar(id);
  }
}
