import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsBoolean, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ActualizarColumnaDestinoDto {
  @ApiProperty({ example: 'precio_total', description: 'Nombre de la columna destino', required: false })
  @IsString()
  @IsOptional()
  nombreColumna?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID del tipo de dato', required: false })
  @IsUUID()
  @IsOptional()
  tipoDatoId?: string;

  @ApiProperty({ example: 2, description: 'Posicion ordinal de la columna', required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  posicionOrdinal?: number;

  @ApiProperty({ example: false, description: 'Indica si la columna acepta nulos', required: false })
  @IsBoolean()
  @IsOptional()
  esNullable?: boolean;

  @ApiProperty({ example: true, description: 'Indica si contiene datos PII', required: false })
  @IsBoolean()
  @IsOptional()
  esPii?: boolean;

  @ApiProperty({ example: true, description: 'Indica si el valor debe transformarse en mayusculas/minusculas', required: false })
  @IsBoolean()
  @IsOptional()
  obligaCase?: boolean;

  @ApiProperty({ example: 'DD/MM/YYYY', description: 'Formato esperado del valor', required: false })
  @IsString()
  @IsOptional()
  formatoEsperado?: string;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
