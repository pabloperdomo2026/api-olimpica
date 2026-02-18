import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { NivelCriticidadService } from './nivel-criticidad.service';
import { NivelCriticidadResponse } from './interfaces/nivel-criticidad-response.interface';
import { CrearNivelCriticidadDto, ActualizarNivelCriticidadDto } from './dtos';
import { EliminarNivelCriticidadResponse } from './casos-de-uso/eliminar-nivel-criticidad.use-case';

@ApiTags('Nivel Criticidad')
@ApiBearerAuth()
@Controller('niveles-criticidad')
export class NivelCriticidadController {
  constructor(private readonly service: NivelCriticidadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nivel de criticidad' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearNivelCriticidadDto): Promise<NivelCriticidadResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar niveles de criticidad' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<NivelCriticidadResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener nivel de criticidad por ID' })
  @ApiParam({ name: 'id', description: 'ID del nivel de criticidad' })
  async obtenerPorId(@Param('id') id: string): Promise<NivelCriticidadResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar nivel de criticidad' })
  @ApiParam({ name: 'id', description: 'ID del nivel de criticidad' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarNivelCriticidadDto): Promise<NivelCriticidadResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar nivel de criticidad' })
  @ApiParam({ name: 'id', description: 'ID del nivel de criticidad' })
  async eliminar(@Param('id') id: string): Promise<EliminarNivelCriticidadResponse> {
    return this.service.eliminar(id);
  }
}
