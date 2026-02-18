import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ColumnaOrigenService } from './columna-origen.service';
import { ColumnaOrigenResponse } from './interfaces/columna-origen-response.interface';
import { CrearColumnaOrigenDto, ActualizarColumnaOrigenDto } from './dtos';
import { EliminarColumnaOrigenResponse } from './casos-de-uso/eliminar-columna-origen.use-case';

@ApiTags('Columna Origen')
@ApiBearerAuth()
@Controller('columnas-origen')
export class ColumnaOrigenController {
  constructor(private readonly service: ColumnaOrigenService) {}

  @Post()
  @ApiOperation({ summary: 'Crear columna origen' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  async crear(@Body() dto: CrearColumnaOrigenDto): Promise<ColumnaOrigenResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar columnas origen' })
  @ApiQuery({ name: 'fuenteId', required: false, description: 'Filtrar por fuente de datos' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(@Query('fuenteId') fuenteId?: string): Promise<ColumnaOrigenResponse[]> {
    return this.service.listarTodos(fuenteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener columna origen por ID' })
  @ApiParam({ name: 'id', description: 'ID de la columna origen' })
  async obtenerPorId(@Param('id') id: string): Promise<ColumnaOrigenResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar columna origen' })
  @ApiParam({ name: 'id', description: 'ID de la columna origen' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarColumnaOrigenDto): Promise<ColumnaOrigenResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar columna origen' })
  @ApiParam({ name: 'id', description: 'ID de la columna origen' })
  async eliminar(@Param('id') id: string): Promise<EliminarColumnaOrigenResponse> {
    return this.service.eliminar(id);
  }
}
