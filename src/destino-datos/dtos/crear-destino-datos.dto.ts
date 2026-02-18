import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearDestinoDatosDto {
  @ApiProperty({ example: 'SCANNTECH_API', description: 'Codigo unico del destino' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Scanntech API Produccion', description: 'Nombre del destino' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID de la organizacion' })
  @IsUUID()
  @IsNotEmpty()
  organizacionId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID del tipo de destino' })
  @IsUUID()
  @IsNotEmpty()
  tipoDestinoId: string;

  @ApiProperty({ example: 'API_REST', description: 'Tipo de destino (descripcion)', required: false })
  @IsString()
  @IsOptional()
  tipoDestino?: string;

  @ApiProperty({ example: 'https://api.scanntech.com/v1/ventas', description: 'Endpoint de la API', required: false })
  @IsString()
  @IsOptional()
  endpointApi?: string;

  @ApiProperty({ example: 'clave-api-123', description: 'API key (se almacena encriptado)', required: false })
  @IsString()
  @IsOptional()
  apiKey?: string;

  @ApiProperty({ example: 'password123', description: 'Password (se almacena encriptado)', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 350, description: 'Tamano del lote de registros', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  tamanoLoteRegistros?: number;

  @ApiProperty({ example: '{}', description: 'Parametros adicionales en JSON', required: false })
  @IsString()
  @IsOptional()
  parametrosJson?: string;

  @ApiProperty({ example: 90, description: 'Dias de retencion de datos' })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  tiempoRetencion: number;
}
