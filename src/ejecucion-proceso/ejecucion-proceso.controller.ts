import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EjecucionProcesoService } from './ejecucion-proceso.service';
import { EjecucionProcesoResponse } from './interfaces/ejecucion-proceso-response.interface';

@ApiTags('Ejecuciones')
@ApiBearerAuth()
@Controller('ejecuciones')
export class EjecucionProcesoController {
  constructor(
    private readonly ejecucionProcesoService: EjecucionProcesoService,
  ) {}

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
