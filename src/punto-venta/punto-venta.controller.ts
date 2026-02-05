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
import { PuntoVentaService } from './punto-venta.service';
import { PuntoVentaResponse } from './interfaces/punto-venta-response.interface';
import { CrearPuntoVentaDto, ActualizarPuntoVentaDto } from './dtos';
import { EliminarPuntoVentaResponse } from './casos-de-uso/eliminar-punto-venta.use-case';

@ApiTags('Puntos de Venta')
@ApiBearerAuth()
@Controller('puntos-venta')
export class PuntoVentaController {
  constructor(private readonly puntoVentaService: PuntoVentaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear punto de venta', description: 'Crea un nuevo punto de venta (tienda) en el sistema' })
  @ApiResponse({ status: 201, description: 'Punto de venta creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El codigo de tienda ya esta registrado' })
  async crear(@Body() dto: CrearPuntoVentaDto): Promise<PuntoVentaResponse> {
    return this.puntoVentaService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar puntos de venta', description: 'Obtiene todos los puntos de venta del sistema' })
  @ApiQuery({ name: 'organizacionId', required: false, description: 'Filtrar por organizacion' })
  @ApiResponse({ status: 200, description: 'Lista de puntos de venta obtenida exitosamente' })
  async listarTodos(
    @Query('organizacionId') organizacionId?: string,
  ): Promise<PuntoVentaResponse[]> {
    return this.puntoVentaService.listarTodos(organizacionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener punto de venta por ID', description: 'Obtiene un punto de venta especifico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del punto de venta' })
  @ApiResponse({ status: 200, description: 'Punto de venta encontrado' })
  @ApiResponse({ status: 404, description: 'Punto de venta no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<PuntoVentaResponse> {
    return this.puntoVentaService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar punto de venta', description: 'Actualiza los datos de un punto de venta existente' })
  @ApiParam({ name: 'id', description: 'ID del punto de venta' })
  @ApiResponse({ status: 200, description: 'Punto de venta actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Punto de venta no encontrado' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarPuntoVentaDto,
  ): Promise<PuntoVentaResponse> {
    return this.puntoVentaService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar punto de venta', description: 'Elimina un punto de venta del sistema' })
  @ApiParam({ name: 'id', description: 'ID del punto de venta' })
  @ApiResponse({ status: 200, description: 'Punto de venta eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Punto de venta no encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarPuntoVentaResponse> {
    return this.puntoVentaService.eliminar(id);
  }
}
