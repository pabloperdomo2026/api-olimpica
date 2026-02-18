import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { TipoDatoService } from './tipo-dato.service';
import { TipoDatoResponse } from './interfaces/tipo-dato-response.interface';
import { CrearTipoDatoDto, ActualizarTipoDatoDto } from './dtos';
import { EliminarTipoDatoResponse } from './casos-de-uso/eliminar-tipo-dato.use-case';

@ApiTags('Tipo Datos')
@ApiBearerAuth()
@Controller('tipos-dato')
export class TipoDatoController {
  constructor(private readonly service: TipoDatoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de dato' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearTipoDatoDto): Promise<TipoDatoResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de dato' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<TipoDatoResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de dato por ID' })
  @ApiParam({ name: 'id', description: 'ID del tipo de dato' })
  async obtenerPorId(@Param('id') id: string): Promise<TipoDatoResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de dato' })
  @ApiParam({ name: 'id', description: 'ID del tipo de dato' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarTipoDatoDto): Promise<TipoDatoResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de dato' })
  @ApiParam({ name: 'id', description: 'ID del tipo de dato' })
  async eliminar(@Param('id') id: string): Promise<EliminarTipoDatoResponse> {
    return this.service.eliminar(id);
  }
}
