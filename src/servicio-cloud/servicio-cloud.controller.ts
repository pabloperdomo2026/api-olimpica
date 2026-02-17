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
import { ServicioCloudService } from './servicio-cloud.service';
import { ServicioCloudResponse } from './interfaces/servicio-cloud-response.interface';
import { CrearServicioCloudDto, ActualizarServicioCloudDto } from './dtos';
import { EliminarServicioCloudResponse } from './casos-de-uso/eliminar-servicio-cloud.use-case';

@ApiTags('Servicios Cloud')
@ApiBearerAuth()
@Controller('servicios-cloud')
export class ServicioCloudController {
  constructor(private readonly servicioCloudService: ServicioCloudService) {}

  @Post()
  @ApiOperation({ summary: 'Crear servicio cloud', description: 'Crea un nuevo servicio cloud en el sistema' })
  @ApiResponse({ status: 201, description: 'Servicio cloud creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  async crear(@Body() dto: CrearServicioCloudDto): Promise<ServicioCloudResponse> {
    return this.servicioCloudService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar servicios cloud', description: 'Obtiene todos los servicios cloud del sistema' })
  @ApiResponse({ status: 200, description: 'Lista de servicios cloud obtenida exitosamente' })
  async listarTodos(): Promise<ServicioCloudResponse[]> {
    return this.servicioCloudService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener servicio cloud por ID', description: 'Obtiene un servicio cloud especifico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del servicio cloud' })
  @ApiResponse({ status: 200, description: 'Servicio cloud encontrado' })
  @ApiResponse({ status: 404, description: 'Servicio cloud no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<ServicioCloudResponse> {
    return this.servicioCloudService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar servicio cloud', description: 'Actualiza los datos de un servicio cloud existente' })
  @ApiParam({ name: 'id', description: 'ID del servicio cloud' })
  @ApiResponse({ status: 200, description: 'Servicio cloud actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Servicio cloud no encontrado' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarServicioCloudDto,
  ): Promise<ServicioCloudResponse> {
    return this.servicioCloudService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar servicio cloud', description: 'Elimina un servicio cloud del sistema' })
  @ApiParam({ name: 'id', description: 'ID del servicio cloud' })
  @ApiResponse({ status: 200, description: 'Servicio cloud eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Servicio cloud no encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarServicioCloudResponse> {
    return this.servicioCloudService.eliminar(id);
  }
}
