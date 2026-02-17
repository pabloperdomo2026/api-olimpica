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
import { ProveedorCloudService } from './proveedor-cloud.service';
import { ProveedorCloudResponse } from './interfaces/proveedor-cloud-response.interface';
import { CrearProveedorCloudDto, ActualizarProveedorCloudDto } from './dtos';
import { EliminarProveedorCloudResponse } from './casos-de-uso/eliminar-proveedor-cloud.use-case';

@ApiTags('Proveedores Cloud')
@ApiBearerAuth()
@Controller('proveedores-cloud')
export class ProveedorCloudController {
  constructor(private readonly proveedorCloudService: ProveedorCloudService) {}

  @Post()
  @ApiOperation({ summary: 'Crear proveedor cloud', description: 'Crea un nuevo proveedor cloud en el sistema' })
  @ApiResponse({ status: 201, description: 'Proveedor cloud creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada invalidos' })
  @ApiResponse({ status: 409, description: 'El codigo ya esta registrado' })
  async crear(@Body() dto: CrearProveedorCloudDto): Promise<ProveedorCloudResponse> {
    return this.proveedorCloudService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar proveedores cloud', description: 'Obtiene todos los proveedores cloud del sistema' })
  @ApiResponse({ status: 200, description: 'Lista de proveedores cloud obtenida exitosamente' })
  async listarTodos(): Promise<ProveedorCloudResponse[]> {
    return this.proveedorCloudService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proveedor cloud por ID', description: 'Obtiene un proveedor cloud especifico por su ID' })
  @ApiParam({ name: 'id', description: 'ID del proveedor cloud' })
  @ApiResponse({ status: 200, description: 'Proveedor cloud encontrado' })
  @ApiResponse({ status: 404, description: 'Proveedor cloud no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<ProveedorCloudResponse> {
    return this.proveedorCloudService.obtenerPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar proveedor cloud', description: 'Actualiza los datos de un proveedor cloud existente' })
  @ApiParam({ name: 'id', description: 'ID del proveedor cloud' })
  @ApiResponse({ status: 200, description: 'Proveedor cloud actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proveedor cloud no encontrado' })
  async editar(
    @Param('id') id: string,
    @Body() dto: ActualizarProveedorCloudDto,
  ): Promise<ProveedorCloudResponse> {
    return this.proveedorCloudService.editar(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar proveedor cloud', description: 'Elimina un proveedor cloud del sistema' })
  @ApiParam({ name: 'id', description: 'ID del proveedor cloud' })
  @ApiResponse({ status: 200, description: 'Proveedor cloud eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proveedor cloud no encontrado' })
  async eliminar(@Param('id') id: string): Promise<EliminarProveedorCloudResponse> {
    return this.proveedorCloudService.eliminar(id);
  }
}
