import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RecipienteCorreoService } from './recipiente-correo.service';
import { CrearRecipienteCorreoDto, ActualizarRecipienteCorreoDto } from './dtos';
import { RecipienteCorreoResponse } from './interfaces/recipiente-correo-response.interface';
import { EliminarRecipienteCorreoResponse } from './casos-de-uso/eliminar-recipiente-correo.use-case';

@ApiTags('Recipiente Correo')
@ApiBearerAuth()
@Controller('recipientes-correo')
export class RecipienteCorreoController {
  constructor(private readonly service: RecipienteCorreoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear recipiente de correo' })
  @ApiResponse({ status: 201, description: 'Creado exitosamente' })
  async crear(@Body() dto: CrearRecipienteCorreoDto): Promise<RecipienteCorreoResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar recipientes de correo' })
  @ApiResponse({ status: 200, description: 'Lista obtenida exitosamente' })
  async listarTodos(): Promise<RecipienteCorreoResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener recipiente de correo por ID' })
  @ApiParam({ name: 'id', description: 'ID del recipiente de correo' })
  async obtenerPorId(@Param('id') id: string): Promise<RecipienteCorreoResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar recipiente de correo' })
  @ApiParam({ name: 'id', description: 'ID del recipiente de correo' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarRecipienteCorreoDto,
  ): Promise<RecipienteCorreoResponse> {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar recipiente de correo' })
  @ApiParam({ name: 'id', description: 'ID del recipiente de correo' })
  async eliminar(@Param('id') id: string): Promise<EliminarRecipienteCorreoResponse> {
    return this.service.eliminar(id);
  }
}
