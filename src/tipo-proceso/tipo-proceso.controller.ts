import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TipoProcesoService } from './tipo-proceso.service';
import { TipoProcesoResponse } from './interfaces/tipo-proceso-response.interface';
import { CrearTipoProcesoDto, ActualizarTipoProcesoDto } from './dtos';
import { EliminarTipoProcesoResponse } from './casos-de-uso/eliminar-tipo-proceso.use-case';

@ApiTags('Tipo Proceso')
@ApiBearerAuth()
@Controller('tipos-proceso')
export class TipoProcesoController {
  constructor(private readonly service: TipoProcesoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de proceso' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearTipoProcesoDto): Promise<TipoProcesoResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de proceso' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<TipoProcesoResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de proceso por ID' })
  @ApiParam({ name: 'id', description: 'ID del tipo de proceso' })
  async obtenerPorId(@Param('id') id: string): Promise<TipoProcesoResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de proceso' })
  @ApiParam({ name: 'id', description: 'ID del tipo de proceso' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarTipoProcesoDto): Promise<TipoProcesoResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de proceso' })
  @ApiParam({ name: 'id', description: 'ID del tipo de proceso' })
  async eliminar(@Param('id') id: string): Promise<EliminarTipoProcesoResponse> {
    return this.service.eliminar(id);
  }
}
