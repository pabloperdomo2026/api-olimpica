import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TipoDestinoService } from './tipo-destino.service';
import { TipoDestinoResponse } from './interfaces/tipo-destino-response.interface';
import { CrearTipoDestinoDto, ActualizarTipoDestinoDto } from './dtos';
import { EliminarTipoDestinoResponse } from './casos-de-uso/eliminar-tipo-destino.use-case';

@ApiTags('Tipo Destinos')
@ApiBearerAuth()
@Controller('tipos-destino')
export class TipoDestinoController {
  constructor(private readonly service: TipoDestinoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de destino' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearTipoDestinoDto): Promise<TipoDestinoResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de destino' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<TipoDestinoResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de destino por ID' })
  @ApiParam({ name: 'id', description: 'ID del tipo de destino' })
  async obtenerPorId(@Param('id') id: string): Promise<TipoDestinoResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de destino' })
  @ApiParam({ name: 'id', description: 'ID del tipo de destino' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarTipoDestinoDto): Promise<TipoDestinoResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de destino' })
  @ApiParam({ name: 'id', description: 'ID del tipo de destino' })
  async eliminar(@Param('id') id: string): Promise<EliminarTipoDestinoResponse> {
    return this.service.eliminar(id);
  }
}
