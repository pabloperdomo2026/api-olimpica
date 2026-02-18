import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { MensajeErrorService } from './mensaje-error.service';
import { MensajeErrorResponse } from './interfaces/mensaje-error-response.interface';
import { CrearMensajeErrorDto, ActualizarMensajeErrorDto } from './dtos';
import { EliminarMensajeErrorResponse } from './casos-de-uso/eliminar-mensaje-error.use-case';

@ApiTags('Mensajes Error')
@ApiBearerAuth()
@Controller('mensajes-error')
export class MensajeErrorController {
  constructor(private readonly service: MensajeErrorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear mensaje de error' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearMensajeErrorDto): Promise<MensajeErrorResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar mensajes de error' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<MensajeErrorResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener mensaje de error por ID' })
  @ApiParam({ name: 'id', description: 'ID del mensaje de error' })
  async obtenerPorId(@Param('id') id: string): Promise<MensajeErrorResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar mensaje de error' })
  @ApiParam({ name: 'id', description: 'ID del mensaje de error' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarMensajeErrorDto): Promise<MensajeErrorResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar mensaje de error' })
  @ApiParam({ name: 'id', description: 'ID del mensaje de error' })
  async eliminar(@Param('id') id: string): Promise<EliminarMensajeErrorResponse> {
    return this.service.eliminar(id);
  }
}
