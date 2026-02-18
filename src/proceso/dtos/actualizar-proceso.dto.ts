import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class ActualizarProcesoDto {
  @ApiPropertyOptional({ description: 'ID del tipo de proceso' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  tipoProcesoId?: number;

  @ApiPropertyOptional({ description: 'ID del nivel de criticidad' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  nivelCriticidadId?: number;

  @ApiPropertyOptional({ description: 'Nombre del proceso', maxLength: 255 })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Descripcion del proceso' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Version del proceso', maxLength: 50 })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiPropertyOptional({ description: 'ID del workflow en la nube', maxLength: 255 })
  @IsString()
  @IsOptional()
  idWorkflowCloud?: string;

  @ApiPropertyOptional({ description: 'Secret del workflow', maxLength: 255 })
  @IsString()
  @IsOptional()
  workflowSecret?: string;

  @ApiPropertyOptional({ description: 'Parametros en formato JSON' })
  @IsString()
  @IsOptional()
  parametrosJson?: string;

  @ApiPropertyOptional({ description: 'ID del servicio cloud' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  servicioCloudId?: number;

  @ApiPropertyOptional({ description: 'Es el proceso inicial del flujo' })
  @IsBoolean()
  @IsOptional()
  esProcesoInicial?: boolean;

  @ApiPropertyOptional({ description: 'Estado activo/inactivo' })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @ApiPropertyOptional({ description: 'ID del destino' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  destinoId?: number;

  @ApiPropertyOptional({ description: 'ID de la fuente' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  fuenteId?: number;
}
