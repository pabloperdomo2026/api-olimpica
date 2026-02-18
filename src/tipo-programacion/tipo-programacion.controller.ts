import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TipoProgramacionService } from './tipo-programacion.service';
import { TipoProgramacionResponse } from './interfaces/tipo-programacion-response.interface';
import { CrearTipoProgramacionDto, ActualizarTipoProgramacionDto } from './dtos';
import { EliminarTipoProgramacionResponse } from './casos-de-uso/eliminar-tipo-programacion.use-case';

@ApiTags('Tipo Programacion')
@ApiBearerAuth()
@Controller('tipos-programacion')
export class TipoProgramacionController {
  constructor(private readonly service: TipoProgramacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de programacion' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearTipoProgramacionDto): Promise<TipoProgramacionResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de programacion' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<TipoProgramacionResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de programacion por ID' })
  @ApiParam({ name: 'id', description: 'ID del tipo de programacion' })
  async obtenerPorId(@Param('id') id: string): Promise<TipoProgramacionResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de programacion' })
  @ApiParam({ name: 'id', description: 'ID del tipo de programacion' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarTipoProgramacionDto): Promise<TipoProgramacionResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de programacion' })
  @ApiParam({ name: 'id', description: 'ID del tipo de programacion' })
  async eliminar(@Param('id') id: string): Promise<EliminarTipoProgramacionResponse> {
    return this.service.eliminar(id);
  }
}
