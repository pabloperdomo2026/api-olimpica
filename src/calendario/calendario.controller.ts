import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CalendarioService } from './calendario.service';
import { CalendarioResponse } from './interfaces/calendario-response.interface';
import { CrearCalendarioDto, ActualizarCalendarioDto } from './dtos';
import { EliminarCalendarioResponse } from './casos-de-uso/eliminar-calendario.use-case';

@ApiTags('Calendarios')
@ApiBearerAuth()
@Controller('calendarios')
export class CalendarioController {
  constructor(private readonly service: CalendarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear fecha calendario', description: 'Crea una nueva fecha en el calendario' })
  @ApiResponse({ status: 201, description: 'Fecha creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  async crear(@Body() dto: CrearCalendarioDto): Promise<CalendarioResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar calendarios', description: 'Obtiene todas las fechas del calendario' })
  @ApiResponse({ status: 200, description: 'Lista de fechas obtenida exitosamente' })
  async listarTodos(): Promise<CalendarioResponse[]> {
    return this.service.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener fecha por ID', description: 'Obtiene una fecha especifica por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la fecha' })
  @ApiResponse({ status: 200, description: 'Fecha encontrada' })
  @ApiResponse({ status: 404, description: 'Fecha no encontrada' })
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<CalendarioResponse> {
    return this.service.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar fecha', description: 'Actualiza los datos de una fecha del calendario' })
  @ApiParam({ name: 'id', description: 'ID de la fecha' })
  @ApiResponse({ status: 200, description: 'Fecha actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Fecha no encontrada' })
  async editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarCalendarioDto,
  ): Promise<CalendarioResponse> {
    return this.service.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar fecha', description: 'Elimina una fecha del calendario' })
  @ApiParam({ name: 'id', description: 'ID de la fecha' })
  @ApiResponse({ status: 200, description: 'Fecha eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Fecha no encontrada' })
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<EliminarCalendarioResponse> {
    return this.service.eliminar(id);
  }
}
