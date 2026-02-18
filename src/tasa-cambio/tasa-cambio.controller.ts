import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TasaCambioService } from './tasa-cambio.service';
import { TasaCambioResponse } from './interfaces/tasa-cambio-response.interface';
import { CrearTasaCambioDto, ActualizarTasaCambioDto } from './dtos';
import { EliminarTasaCambioResponse } from './casos-de-uso/eliminar-tasa-cambio.use-case';

@ApiTags('Tasa Cambio')
@ApiBearerAuth()
@Controller('tasas-cambio')
export class TasaCambioController {
  constructor(private readonly service: TasaCambioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tasa de cambio' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  async crear(@Body() dto: CrearTasaCambioDto): Promise<TasaCambioResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tasas de cambio' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<TasaCambioResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tasa de cambio por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tasa de cambio' })
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<TasaCambioResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tasa de cambio' })
  @ApiParam({ name: 'id', description: 'ID de la tasa de cambio' })
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarTasaCambioDto,
  ): Promise<TasaCambioResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tasa de cambio' })
  @ApiParam({ name: 'id', description: 'ID de la tasa de cambio' })
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<EliminarTasaCambioResponse> {
    return this.service.eliminar(id);
  }
}
