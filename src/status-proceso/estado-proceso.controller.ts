import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { EstadoProcesoService } from './estado-proceso.service';
import { EstadoProcesoResponse } from './interfaces/estado-proceso-response.interface';
import { CrearEstadoProcesoDto, ActualizarEstadoProcesoDto } from './dtos';
import { EliminarEstadoProcesoResponse } from './casos-de-uso/eliminar-estado-proceso.use-case';

@ApiTags('Estado Proceso')
@ApiBearerAuth()
@Controller('estados-proceso')
export class EstadoProcesoController {
  constructor(private readonly service: EstadoProcesoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear estado de proceso' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearEstadoProcesoDto): Promise<EstadoProcesoResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar estados de proceso' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<EstadoProcesoResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener estado de proceso por ID' })
  @ApiParam({ name: 'id', description: 'ID del estado de proceso' })
  async obtenerPorId(@Param('id') id: string): Promise<EstadoProcesoResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar estado de proceso' })
  @ApiParam({ name: 'id', description: 'ID del estado de proceso' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarEstadoProcesoDto): Promise<EstadoProcesoResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estado de proceso' })
  @ApiParam({ name: 'id', description: 'ID del estado de proceso' })
  async eliminar(@Param('id') id: string): Promise<EliminarEstadoProcesoResponse> {
    return this.service.eliminar(id);
  }
}
