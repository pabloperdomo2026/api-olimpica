import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ActualizarServicioCloudDto {
  @ApiProperty({ example: 'uuid-proveedor', description: 'ID del proveedor cloud', required: false })
  @IsString()
  @IsOptional()
  proveedorCloudId?: string;

  @ApiProperty({ example: 'us-east-1', description: 'Region del servicio', required: false })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ example: '123456789012', description: 'Cuenta cloud', required: false })
  @IsString()
  @IsOptional()
  cloudAccount?: string;

  @ApiProperty({ example: 'secret-token', description: 'Token/secret de autenticacion', required: false })
  @IsString()
  @IsOptional()
  tokenSecret?: string;

  @ApiProperty({ example: 'Step Functions', description: 'Tipo de servicio cloud', required: false })
  @IsString()
  @IsOptional()
  tipoServicio?: string;

  @ApiProperty({ example: 'ETL Scanntech', description: 'Nombre del servicio', required: false })
  @IsString()
  @IsOptional()
  nombreServicio?: string;

  @ApiProperty({ example: 'arn:aws:states:us-east-1:123456789012:stateMachine:etl', description: 'URI del recurso', required: false })
  @IsString()
  @IsOptional()
  uriRecurso?: string;

  @ApiProperty({ example: '{}', description: 'Parametros JSON del servicio', required: false })
  @IsString()
  @IsOptional()
  parametrosJson?: string;

  @ApiProperty({ example: 'S', description: 'Permite inicio (S/N)', required: false })
  @IsString()
  @IsOptional()
  permiteInicio?: string;

  @ApiProperty({ example: 'S', description: 'Permite detener (S/N)', required: false })
  @IsString()
  @IsOptional()
  permiteDetener?: string;

  @ApiProperty({ example: 'A', description: 'Estado del servicio (A=Activo, I=Inactivo)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;

  @ApiProperty({ example: '1', description: 'ID de la organizacion', required: false })
  @IsString()
  @IsOptional()
  organizacionId?: string;
}
