import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearProcesoDto {
  @ApiProperty({ description: 'ID de la organizacion (UUID)' })
  @IsUUID()
  @IsNotEmpty()
  organizacionId: string;

  @ApiProperty({ description: 'ID del tipo de proceso' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  tipoProcesoId: number;

  @ApiProperty({ description: 'ID del nivel de criticidad' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  nivelCriticidadId: number;

  @ApiProperty({ description: 'Codigo unico del proceso', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ description: 'Nombre del proceso', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  nombre: string;

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

  @ApiPropertyOptional({ description: 'Es el proceso inicial del flujo', default: false })
  @IsBoolean()
  @IsOptional()
  esProcesoInicial?: boolean;

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
