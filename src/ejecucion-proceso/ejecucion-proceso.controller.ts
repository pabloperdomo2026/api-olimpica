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
import { CrearEjecucionProcesoDto, CrearEventoEjecucionDto } from './dtos';
import { EjecucionProcesoResponse } from './interfaces/ejecucion-proceso-response.interface';
import { DashboardResponse } from './interfaces/dashboard-response.interface';

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

  @Post('eventos')
  @ApiOperation({
    summary: 'Registrar evento de ejecucion',
    description:
      'Recibe un evento de cambio de estado para una ejecucion en curso. ' +
      'Usado por Step Functions o el proceso ETL para notificar avances, ' +
      'finalizaciones o errores.',
  })
  @ApiResponse({ status: 201, description: 'Evento registrado y ejecucion actualizada' })
  @ApiResponse({ status: 404, description: 'Ejecucion o estado no encontrado' })
  async registrarEvento(
    @Body() dto: any,
  ): Promise<any> {
    return this.ejecucionProcesoService.registrarEvento(dto);
  }

  @Post('finalizar')
  @ApiOperation({
    summary: 'Finalizar evento de ejecucion',
    description: 'Recibe la señal de finalizacion de una ejecucion en curso.',
  })
  @ApiResponse({ status: 201, description: 'Evento de finalizacion registrado' })
  async finalizarEvento(@Body() dto: any): Promise<any> {
    return this.ejecucionProcesoService.finalizarEvento(dto);
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

  @Get('dashboard')
  @ApiOperation({
    summary: 'Obtener datos del dashboard',
    description: 'Retorna KPIs, ejecuciones por hora, ultimas ejecuciones y procesos con fallas del dia actual',
  })
  @ApiResponse({ status: 200, description: 'Datos del dashboard obtenidos exitosamente' })
  async obtenerDashboard(): Promise<DashboardResponse> {
    return this.ejecucionProcesoService.obtenerDashboard();
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
