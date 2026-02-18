import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TipoAlertaService } from './tipo-alerta.service';
import { TipoAlertaResponse } from './interfaces/tipo-alerta-response.interface';
import { CrearTipoAlertaDto, ActualizarTipoAlertaDto } from './dtos';
import { EliminarTipoAlertaResponse } from './casos-de-uso/eliminar-tipo-alerta.use-case';

@ApiTags('Tipo Alertas')
@ApiBearerAuth()
@Controller('tipos-alerta')
export class TipoAlertaController {
  constructor(private readonly service: TipoAlertaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de alerta' })
  @ApiResponse({ status: 201, description: 'Tipo de alerta creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearTipoAlertaDto): Promise<TipoAlertaResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de alerta' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<TipoAlertaResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de alerta por ID' })
  @ApiParam({ name: 'id', description: 'ID del tipo de alerta' })
  @ApiResponse({ status: 200, description: 'Tipo de alerta encontrado' })
  @ApiResponse({ status: 404, description: 'No encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<TipoAlertaResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de alerta' })
  @ApiParam({ name: 'id', description: 'ID del tipo de alerta' })
  @ApiResponse({ status: 200, description: 'Actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'No encontrado' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarTipoAlertaDto): Promise<TipoAlertaResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de alerta' })
  @ApiParam({ name: 'id', description: 'ID del tipo de alerta' })
  @ApiResponse({ status: 200, description: 'Eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'No encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarTipoAlertaResponse> {
    return this.service.eliminar(id);
  }
}
