import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ProcesoMapeoCampoService } from './proceso-mapeo-campo.service';
import { ProcesoMapeoCampoResponse } from './interfaces/proceso-mapeo-campo-response.interface';
import { CrearProcesoMapeoCampoDto, ActualizarProcesoMapeoCampoDto } from './dtos';
import { EliminarProcesoMapeoCampoResponse } from './casos-de-uso/eliminar-proceso-mapeo-campo.use-case';

@ApiTags('Proceso Mapeo Campo')
@ApiBearerAuth()
@Controller('proceso-mapeo-campo')
export class ProcesoMapeoCampoController {
  constructor(private readonly service: ProcesoMapeoCampoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear mapeo de campo' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  async crear(@Body() dto: CrearProcesoMapeoCampoDto): Promise<ProcesoMapeoCampoResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar mapeos de campo' })
  @ApiQuery({ name: 'procesoId', required: false, description: 'Filtrar por proceso' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(@Query('procesoId') procesoId?: string): Promise<ProcesoMapeoCampoResponse[]> {
    return this.service.listarTodos(procesoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener mapeo de campo por ID' })
  @ApiParam({ name: 'id', description: 'ID del mapeo de campo' })
  async obtenerPorId(@Param('id') id: string): Promise<ProcesoMapeoCampoResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar mapeo de campo' })
  @ApiParam({ name: 'id', description: 'ID del mapeo de campo' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarProcesoMapeoCampoDto,
  ): Promise<ProcesoMapeoCampoResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar mapeo de campo' })
  @ApiParam({ name: 'id', description: 'ID del mapeo de campo' })
  async eliminar(@Param('id') id: string): Promise<EliminarProcesoMapeoCampoResponse> {
    return this.service.eliminar(id);
  }
}
