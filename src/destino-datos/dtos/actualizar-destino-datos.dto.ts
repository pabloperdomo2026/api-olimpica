import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber, IsInt, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class ActualizarDestinoDatosDto {
  @ApiProperty({ example: 'Scanntech API QA', description: 'Nombre del destino', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID del tipo de destino', required: false })
  @IsUUID()
  @IsOptional()
  tipoDestinoId?: string;

  @ApiProperty({ example: 'API_REST', description: 'Tipo de destino (descripcion)', required: false })
  @IsString()
  @IsOptional()
  tipoDestino?: string;

  @ApiProperty({ example: 'https://api.scanntech.com/v2/ventas', description: 'Endpoint de la API', required: false })
  @IsString()
  @IsOptional()
  endpointApi?: string;

  @ApiProperty({ example: 'nueva-clave-api', description: 'API key (se almacena encriptado)', required: false })
  @IsString()
  @IsOptional()
  apiKey?: string;

  @ApiProperty({ example: 'nuevo-password', description: 'Password (se almacena encriptado)', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 500, description: 'Tamano del lote de registros', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  tamanoLoteRegistros?: number;

  @ApiProperty({ example: '{}', description: 'Parametros adicionales en JSON', required: false })
  @IsString()
  @IsOptional()
  parametrosJson?: string;

  @ApiProperty({ example: 90, description: 'Dias de retencion de datos', required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  tiempoRetencion?: number;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
