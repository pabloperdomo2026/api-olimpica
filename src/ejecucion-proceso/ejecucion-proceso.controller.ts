import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EjecucionProcesoService } from './ejecucion-proceso.service';
import { CrearEjecucionProcesoDto } from './dtos';
import { EjecucionProcesoResponse } from './interfaces/ejecucion-proceso-response.interface';

@ApiTags('Ejecuciones')
@ApiBearerAuth()
@Controller('ejecuciones')
export class EjecucionProcesoController {
  constructor(
    private readonly ejecucionProcesoService: EjecucionProcesoService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear ejecucion',
    description: 'Inicia una nueva ejecucion manual de un proceso ETL',
  })
  @ApiResponse({ status: 201, description: 'Ejecucion creada exitosamente' })
  @ApiResponse({ status: 404, description: 'Proceso o estado inicial no encontrado' })
  async crear(
    @Body() dto: CrearEjecucionProcesoDto,
  ): Promise<EjecucionProcesoResponse> {
    return this.ejecucionProcesoService.crear(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar ejecuciones',
    description: 'Obtiene el historial de ejecuciones de procesos ETL',
  })
  @ApiQuery({
    name: 'procesoId',
    required: false,
    description: 'Filtrar por proceso',
  })
  @ApiResponse({ status: 200, description: 'Lista de ejecuciones obtenida exitosamente' })
  async listarTodos(
    @Query('procesoId') procesoId?: string,
  ): Promise<EjecucionProcesoResponse[]> {
    return this.ejecucionProcesoService.listarTodos(procesoId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener ejecucion por ID',
    description: 'Obtiene el detalle de una ejecucion especifica',
  })
  @ApiParam({ name: 'id', description: 'ID de la ejecucion' })
  @ApiResponse({ status: 200, description: 'Ejecucion encontrada' })
  @ApiResponse({ status: 404, description: 'Ejecucion no encontrada' })
  async obtenerPorId(@Param('id') id: string): Promise<EjecucionProcesoResponse> {
    return this.ejecucionProcesoService.obtenerPorId(id);
  }
}
