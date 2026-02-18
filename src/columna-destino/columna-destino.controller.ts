import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ColumnaDestinoService } from './columna-destino.service';
import { ColumnaDestinoResponse } from './interfaces/columna-destino-response.interface';
import { CrearColumnaDestinoDto, ActualizarColumnaDestinoDto } from './dtos';
import { EliminarColumnaDestinoResponse } from './casos-de-uso/eliminar-columna-destino.use-case';

@ApiTags('Columna Destino')
@ApiBearerAuth()
@Controller('columnas-destino')
export class ColumnaDestinoController {
  constructor(private readonly service: ColumnaDestinoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear columna destino' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  async crear(@Body() dto: CrearColumnaDestinoDto): Promise<ColumnaDestinoResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar columnas destino' })
  @ApiQuery({ name: 'destinoId', required: false, description: 'Filtrar por destino de datos' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(@Query('destinoId') destinoId?: string): Promise<ColumnaDestinoResponse[]> {
    return this.service.listarTodos(destinoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener columna destino por ID' })
  @ApiParam({ name: 'id', description: 'ID de la columna destino' })
  async obtenerPorId(@Param('id') id: string): Promise<ColumnaDestinoResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar columna destino' })
  @ApiParam({ name: 'id', description: 'ID de la columna destino' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarColumnaDestinoDto): Promise<ColumnaDestinoResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar columna destino' })
  @ApiParam({ name: 'id', description: 'ID de la columna destino' })
  async eliminar(@Param('id') id: string): Promise<EliminarColumnaDestinoResponse> {
    return this.service.eliminar(id);
  }
}
