import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { FuncionesSistemaService } from './funciones-sistema.service';
import { FuncionesSistemaResponse } from './interfaces/funciones-sistema-response.interface';
import { CrearFuncionesSistemaDto, ActualizarFuncionesSistemaDto } from './dtos';
import { EliminarFuncionesSistemaResponse } from './casos-de-uso/eliminar-funciones-sistema.use-case';

@ApiTags('Funciones Sistema')
@ApiBearerAuth()
@Controller('funciones-sistema')
export class FuncionesSistemaController {
  constructor(private readonly service: FuncionesSistemaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear funcion del sistema' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearFuncionesSistemaDto): Promise<FuncionesSistemaResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar funciones del sistema' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<FuncionesSistemaResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener funcion del sistema por ID' })
  @ApiParam({ name: 'id', description: 'ID de la funcion del sistema' })
  async obtenerPorId(@Param('id') id: string): Promise<FuncionesSistemaResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar funcion del sistema' })
  @ApiParam({ name: 'id', description: 'ID de la funcion del sistema' })
  async editar(@Param('id') id: string, @Body() dto: ActualizarFuncionesSistemaDto): Promise<FuncionesSistemaResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar funcion del sistema' })
  @ApiParam({ name: 'id', description: 'ID de la funcion del sistema' })
  async eliminar(@Param('id') id: string): Promise<EliminarFuncionesSistemaResponse> {
    return this.service.eliminar(id);
  }
}
