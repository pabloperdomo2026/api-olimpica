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
import { OrganizacionService } from './organizacion.service';
import { OrganizacionResponse } from './interfaces/organizacion-response.interface';
import { CrearOrganizacionDto, ActualizarOrganizacionDto } from './dtos';
import { EliminarOrganizacionResponse } from './casos-de-uso/eliminar-organizacion.use-case';

@ApiTags('Organizaciones')
@ApiBearerAuth()
@Controller('organizaciones')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear organizacion', description: 'Crea una nueva organizacion en el sistema' })
  @ApiResponse({ status: 201, description: 'Organizacion creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El codigo o NIT ya esta registrado' })
  async crear(@Body() dto: CrearOrganizacionDto): Promise<OrganizacionResponse> {
    return this.organizacionService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar organizaciones', description: 'Obtiene todas las organizaciones del sistema' })
  @ApiResponse({ status: 200, description: 'Lista de organizaciones obtenida exitosamente' })
  async listarTodos(): Promise<OrganizacionResponse[]> {
    return this.organizacionService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener organizacion por ID', description: 'Obtiene una organizacion especifica por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la organizacion' })
  @ApiResponse({ status: 200, description: 'Organizacion encontrada' })
  @ApiResponse({ status: 404, description: 'Organizacion no encontrada' })
  async obtenerPorId(@Param('id') id: string): Promise<OrganizacionResponse> {
    return this.organizacionService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar organizacion', description: 'Actualiza los datos de una organizacion existente' })
  @ApiParam({ name: 'id', description: 'ID de la organizacion' })
  @ApiResponse({ status: 200, description: 'Organizacion actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Organizacion no encontrada' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarOrganizacionDto,
  ): Promise<OrganizacionResponse> {
    return this.organizacionService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar organizacion', description: 'Elimina una organizacion del sistema' })
  @ApiParam({ name: 'id', description: 'ID de la organizacion' })
  @ApiResponse({ status: 200, description: 'Organizacion eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Organizacion no encontrada' })
  async eliminar(@Param('id') id: string): Promise<EliminarOrganizacionResponse> {
    return this.organizacionService.eliminar(id);
  }
}
