import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ActualizarProcesoDto {
  @ApiProperty({ example: 1, description: 'ID del tipo de proceso', required: false })
  @IsNumber()
  @IsOptional()
  tipoProcesoId?: number;

  @ApiProperty({ example: 1, description: 'ID del nivel de criticidad', required: false })
  @IsNumber()
  @IsOptional()
  nivelCriticidadId?: number;

  @ApiProperty({ example: 'Proceso ETL Ventas', description: 'Nombre del proceso', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Proceso de extraccion de ventas diarias', description: 'Descripcion del proceso', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: '1.0.1', description: 'Version del proceso', required: false })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiProperty({ example: 'arn:aws:states:us-east-1:123456789:stateMachine:proceso', description: 'ID del workflow en la nube', required: false })
  @IsString()
  @IsOptional()
  idWorkflowCloud?: string;

  @ApiProperty({ example: 'secret-key-123', description: 'Secret del workflow', required: false })
  @IsString()
  @IsOptional()
  workflowSecret?: string;

  @ApiProperty({ example: '{"timeout": 3600}', description: 'Parametros en formato JSON', required: false })
  @IsString()
  @IsOptional()
  parametrosJson?: string;

  @ApiProperty({ example: 1, description: 'ID del servicio cloud', required: false })
  @IsNumber()
  @IsOptional()
  servicioCloudId?: number;

  @ApiProperty({ example: 'S', description: 'Es proceso inicial (S/N)', required: false })
  @IsString()
  @IsOptional()
  esProcesoInicial?: string;

  @ApiProperty({ example: 'S', description: 'Estado activo (S/N)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;

  @ApiProperty({ example: 1, description: 'ID del destino', required: false })
  @IsNumber()
  @IsOptional()
  destinoId?: number;

  @ApiProperty({ example: 1, description: 'ID de la fuente', required: false })
  @IsNumber()
  @IsOptional()
  fuenteId?: number;
}
