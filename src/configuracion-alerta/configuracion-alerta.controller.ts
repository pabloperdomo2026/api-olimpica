import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ConfiguracionAlertaService } from './configuracion-alerta.service';
import { CrearConfiguracionAlertaDto, ActualizarConfiguracionAlertaDto } from './dtos';
import { ConfiguracionAlertaResponse } from './interfaces/configuracion-alerta-response.interface';
import { EliminarConfiguracionAlertaResponse } from './casos-de-uso/eliminar-configuracion-alerta.use-case';

@ApiTags('Configuracion Alerta')
@ApiBearerAuth()
@Controller('configuraciones-alerta')
export class ConfiguracionAlertaController {
  constructor(private readonly service: ConfiguracionAlertaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear configuracion de alerta' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  async crear(@Body() dto: CrearConfiguracionAlertaDto): Promise<ConfiguracionAlertaResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar configuraciones de alerta' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<ConfiguracionAlertaResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener configuracion de alerta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la configuracion de alerta' })
  async obtenerPorId(@Param('id') id: string): Promise<ConfiguracionAlertaResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar configuracion de alerta' })
  @ApiParam({ name: 'id', description: 'ID de la configuracion de alerta' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarConfiguracionAlertaDto,
  ): Promise<ConfiguracionAlertaResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar configuracion de alerta' })
  @ApiParam({ name: 'id', description: 'ID de la configuracion de alerta' })
  async eliminar(@Param('id') id: string): Promise<EliminarConfiguracionAlertaResponse> {
    return this.service.eliminar(id);
  }
}
