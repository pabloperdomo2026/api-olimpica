import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TipoFuenteService } from './tipo-fuente.service';
import { TipoFuenteResponse } from './interfaces/tipo-fuente-response.interface';
import { CrearTipoFuenteDto, ActualizarTipoFuenteDto } from './dtos';
import { EliminarTipoFuenteResponse } from './casos-de-uso/eliminar-tipo-fuente.use-case';

@ApiTags('Tipo Fuente')
@ApiBearerAuth()
@Controller('tipos-fuente')
export class TipoFuenteController {
  constructor(private readonly service: TipoFuenteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de fuente' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearTipoFuenteDto): Promise<TipoFuenteResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de fuente' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<TipoFuenteResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de fuente por ID' })
  @ApiParam({ name: 'id', description: 'ID del tipo de fuente' })
  async obtenerPorId(@Param('id') id: string): Promise<TipoFuenteResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de fuente' })
  @ApiParam({ name: 'id', description: 'ID del tipo de fuente' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarTipoFuenteDto): Promise<TipoFuenteResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de fuente' })
  @ApiParam({ name: 'id', description: 'ID del tipo de fuente' })
  async eliminar(@Param('id') id: string): Promise<EliminarTipoFuenteResponse> {
    return this.service.eliminar(id);
  }
}
