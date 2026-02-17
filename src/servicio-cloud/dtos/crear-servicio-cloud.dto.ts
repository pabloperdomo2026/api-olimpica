import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearServicioCloudDto {
  @ApiProperty({ example: 'uuid-proveedor', description: 'ID del proveedor cloud' })
  @IsString()
  @IsNotEmpty()
  proveedorCloudId: string;

  @ApiProperty({ example: 'us-east-1', description: 'Region del servicio' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ example: '123456789012', description: 'Cuenta cloud' })
  @IsString()
  @IsNotEmpty()
  cloudAccount: string;

  @ApiProperty({ example: 'secret-token', description: 'Token/secret de autenticacion' })
  @IsString()
  @IsOptional()
  tokenSecret?: string;

  @ApiProperty({ example: 'Step Functions', description: 'Tipo de servicio cloud' })
  @IsString()
  @IsNotEmpty()
  tipoServicio: string;

  @ApiProperty({ example: 'ETL Scanntech', description: 'Nombre del servicio' })
  @IsString()
  @IsNotEmpty()
  nombreServicio: string;

  @ApiProperty({ example: 'arn:aws:states:us-east-1:123456789012:stateMachine:etl', description: 'URI del recurso' })
  @IsString()
  @IsNotEmpty()
  uriRecurso: string;

  @ApiProperty({ example: '{}', description: 'Parametros JSON del servicio', required: false })
  @IsString()
  @IsOptional()
  parametrosJson?: string;

  @ApiProperty({ example: '1', description: 'ID de la organizacion' })
  @IsString()
  @IsNotEmpty()
  organizacionId: string;
}
