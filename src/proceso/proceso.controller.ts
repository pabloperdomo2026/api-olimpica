import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProcesoService } from './proceso.service';
import { ProcesoResponse } from './interfaces/proceso-response.interface';
import { CrearProcesoDto, ActualizarProcesoDto } from './dtos';
import { EliminarProcesoResponse } from './casos-de-uso/eliminar-proceso.use-case';

@ApiTags('Procesos')
@ApiBearerAuth()
@Controller('procesos')
export class ProcesoController {
  constructor(private readonly procesoService: ProcesoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear proceso', description: 'Crea un nuevo proceso ETL en el sistema' })
  @ApiResponse({ status: 201, description: 'Proceso creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearProcesoDto): Promise<ProcesoResponse> {
    return this.procesoService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar procesos', description: 'Obtiene todos los procesos del sistema' })
  @ApiQuery({ name: 'organizacionId', required: false, description: 'Filtrar por organizacion' })
  @ApiResponse({ status: 200, description: 'Lista de procesos obtenida exitosamente' })
  async listarTodos(
    @Query('organizacionId') organizacionId?: string,
  ): Promise<ProcesoResponse[]> {
    return this.procesoService.listarTodos(organizacionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proceso por ID', description: 'Obtiene un proceso especifico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del proceso' })
  @ApiResponse({ status: 200, description: 'Proceso encontrado' })
  @ApiResponse({ status: 404, description: 'Proceso no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<ProcesoResponse> {
    return this.procesoService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar proceso', description: 'Actualiza los datos de un proceso existente' })
  @ApiParam({ name: 'id', description: 'ID del proceso' })
  @ApiResponse({ status: 200, description: 'Proceso actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proceso no encontrado' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarProcesoDto,
  ): Promise<ProcesoResponse> {
    return this.procesoService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar proceso', description: 'Elimina un proceso del sistema' })
  @ApiParam({ name: 'id', description: 'ID del proceso' })
  @ApiResponse({ status: 200, description: 'Proceso eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proceso no encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarProcesoResponse> {
    return this.procesoService.eliminar(id);
  }
}
