import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MonedaService } from './moneda.service';
import { MonedaResponse } from './interfaces/moneda-response.interface';
import { CrearMonedaDto, ActualizarMonedaDto } from './dtos';
import { EliminarMonedaResponse } from './casos-de-uso/eliminar-moneda.use-case';

@ApiTags('Monedas')
@ApiBearerAuth()
@Controller('monedas')
export class MonedaController {
  constructor(private readonly monedaService: MonedaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear moneda', description: 'Crea una nueva moneda en el sistema' })
  @ApiResponse({ status: 201, description: 'Moneda creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearMonedaDto): Promise<MonedaResponse> {
    return this.monedaService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar monedas', description: 'Obtiene todas las monedas del sistema' })
  @ApiResponse({ status: 200, description: 'Lista de monedas obtenida exitosamente' })
  async listarTodos(): Promise<MonedaResponse[]> {
    return this.monedaService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener moneda por ID', description: 'Obtiene una moneda especifica por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la moneda' })
  @ApiResponse({ status: 200, description: 'Moneda encontrada' })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada' })
  async obtenerPorId(@Param('id') id: string): Promise<MonedaResponse> {
    return this.monedaService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar moneda', description: 'Actualiza los datos de una moneda existente' })
  @ApiParam({ name: 'id', description: 'ID de la moneda' })
  @ApiResponse({ status: 200, description: 'Moneda actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarMonedaDto,
  ): Promise<MonedaResponse> {
    return this.monedaService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar moneda', description: 'Elimina una moneda del sistema' })
  @ApiParam({ name: 'id', description: 'ID de la moneda' })
  @ApiResponse({ status: 200, description: 'Moneda eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada' })
  async eliminar(@Param('id') id: string): Promise<EliminarMonedaResponse> {
    return this.monedaService.eliminar(id);
  }
}
