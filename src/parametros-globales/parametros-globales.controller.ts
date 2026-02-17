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
import { ParametrosGlobalesService } from './parametros-globales.service';
import { ParametroGlobalResponse } from './interfaces/parametro-global-response.interface';
import { CrearParametroGlobalDto, ActualizarParametroGlobalDto } from './dtos';
import { EliminarParametroGlobalResponse } from './casos-de-uso/eliminar-parametro-global.use-case';

@ApiTags('Parametros Globales')
@ApiBearerAuth()
@Controller('parametros-globales')
export class ParametrosGlobalesController {
  constructor(private readonly service: ParametrosGlobalesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear parametro global', description: 'Crea un nuevo parametro global' })
  @ApiResponse({ status: 201, description: 'Parametro creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El parametro ya existe' })
  async crear(@Body() dto: CrearParametroGlobalDto): Promise<ParametroGlobalResponse> {
    return this.service.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar parametros globales', description: 'Obtiene todos los parametros globales' })
  @ApiResponse({ status: 200, description: 'Lista de parametros obtenida exitosamente' })
  async listarTodos(): Promise<ParametroGlobalResponse[]> {
    return this.service.listarTodos();
  }

  @Get('organizacion/:organizacionId')
  @ApiOperation({ summary: 'Listar por organizacion', description: 'Obtiene parametros de una organizacion' })
  @ApiParam({ name: 'organizacionId', description: 'ID de la organizacion' })
  @ApiResponse({ status: 200, description: 'Parametros obtenidos exitosamente' })
  async listarPorOrganizacion(
    @Param('organizacionId') organizacionId: string,
  ): Promise<ParametroGlobalResponse[]> {
    return this.service.listarPorOrganizacion(organizacionId);
  }

  @Get(':organizacionId/:itemGrupo/:itemAtributo')
  @ApiOperation({ summary: 'Obtener parametro por clave', description: 'Obtiene un parametro por su clave compuesta' })
  @ApiParam({ name: 'organizacionId', description: 'ID de la organizacion' })
  @ApiParam({ name: 'itemGrupo', description: 'Grupo del parametro' })
  @ApiParam({ name: 'itemAtributo', description: 'Atributo del parametro' })
  @ApiResponse({ status: 200, description: 'Parametro encontrado' })
  @ApiResponse({ status: 404, description: 'Parametro no encontrado' })
  async obtenerPorClave(
    @Param('organizacionId') organizacionId: string,
    @Param('itemGrupo') itemGrupo: string,
    @Param('itemAtributo') itemAtributo: string,
  ): Promise<ParametroGlobalResponse> {
    return this.service.obtenerPorClave(organizacionId, itemGrupo, itemAtributo);
  }

  @Put(':organizacionId/:itemGrupo/:itemAtributo')
  @ApiOperation({ summary: 'Actualizar parametro', description: 'Actualiza un parametro global existente' })
  @ApiParam({ name: 'organizacionId', description: 'ID de la organizacion' })
  @ApiParam({ name: 'itemGrupo', description: 'Grupo del parametro' })
  @ApiParam({ name: 'itemAtributo', description: 'Atributo del parametro' })
  @ApiResponse({ status: 200, description: 'Parametro actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Parametro no encontrado' })
  async editar(
    @Param('organizacionId') organizacionId: string,
    @Param('itemGrupo') itemGrupo: string,
    @Param('itemAtributo') itemAtributo: string,
    @Body() dto: ActualizarParametroGlobalDto,
  ): Promise<ParametroGlobalResponse> {
    return this.service.editar(organizacionId, itemGrupo, itemAtributo, dto);
  }

  @Delete(':organizacionId/:itemGrupo/:itemAtributo')
  @ApiOperation({ summary: 'Eliminar parametro', description: 'Elimina un parametro global' })
  @ApiParam({ name: 'organizacionId', description: 'ID de la organizacion' })
  @ApiParam({ name: 'itemGrupo', description: 'Grupo del parametro' })
  @ApiParam({ name: 'itemAtributo', description: 'Atributo del parametro' })
  @ApiResponse({ status: 200, description: 'Parametro eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Parametro no encontrado' })
  async eliminar(
    @Param('organizacionId') organizacionId: string,
    @Param('itemGrupo') itemGrupo: string,
    @Param('itemAtributo') itemAtributo: string,
  ): Promise<EliminarParametroGlobalResponse> {
    return this.service.eliminar(organizacionId, itemGrupo, itemAtributo);
  }
}
