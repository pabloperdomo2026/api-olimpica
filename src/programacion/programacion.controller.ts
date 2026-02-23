import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ProgramacionCrudService } from './programacion-crud.service';
import { CrearProgramacionDto, ActualizarProgramacionDto } from './dtos';
import { ProgramacionResponse } from './interfaces/programacion-response.interface';
import { EliminarProgramacionResponse } from './casos-de-uso/eliminar-programacion.use-case';

@ApiTags('Programacion')
@ApiBearerAuth()
@Controller('programaciones')
export class ProgramacionController {
  constructor(private readonly service: ProgramacionCrudService) {}

  @Post()
  @ApiOperation({ summary: 'Crear programacion' })
  @ApiResponse({ status: 201, description: 'Creada exitosamente' })
  async crear(@Body() dto: CrearProgramacionDto): Promise<ProgramacionResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar programaciones' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<ProgramacionResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener programacion por ID' })
  @ApiParam({ name: 'id', description: 'ID de la programacion' })
  async obtenerPorId(@Param('id') id: string): Promise<ProgramacionResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar programacion' })
  @ApiParam({ name: 'id', description: 'ID de la programacion' })
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarProgramacionDto): Promise<ProgramacionResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar programacion' })
  @ApiParam({ name: 'id', description: 'ID de la programacion' })
  async eliminar(@Param('id') id: string): Promise<EliminarProgramacionResponse> {
    return this.service.eliminar(id);
  }
}
