import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ConfiguracionSlaService } from './configuracion-sla.service';
import { CrearConfiguracionSlaDto, ActualizarConfiguracionSlaDto } from './dtos';
import { ConfiguracionSlaResponse } from './interfaces/configuracion-sla-response.interface';
import { EliminarConfiguracionSlaResponse } from './casos-de-uso/eliminar-configuracion-sla.use-case';

@ApiTags('Configuracion SLA')
@ApiBearerAuth()
@Controller('configuraciones-sla')
export class ConfiguracionSlaController {
  constructor(private readonly service: ConfiguracionSlaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear configuracion de SLA' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  async crear(@Body() dto: CrearConfiguracionSlaDto): Promise<ConfiguracionSlaResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar configuraciones de SLA' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<ConfiguracionSlaResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener configuracion de SLA por ID' })
  @ApiParam({ name: 'id', description: 'ID de la configuracion de SLA' })
  @ApiResponse({ status: 200, description: 'Configuracion encontrada' })
  @ApiResponse({ status: 404, description: 'Configuracion no encontrada' })
  async obtenerPorId(@Param('id') id: string): Promise<ConfiguracionSlaResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar configuracion de SLA' })
  @ApiParam({ name: 'id', description: 'ID de la configuracion de SLA' })
  @ApiResponse({ status: 200, description: 'Actualizada exitosamente' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarConfiguracionSlaDto,
  ): Promise<ConfiguracionSlaResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar configuracion de SLA' })
  @ApiParam({ name: 'id', description: 'ID de la configuracion de SLA' })
  @ApiResponse({ status: 200, description: 'Eliminada exitosamente' })
  async eliminar(@Param('id') id: string): Promise<EliminarConfiguracionSlaResponse> {
    return this.service.eliminar(id);
  }
}
