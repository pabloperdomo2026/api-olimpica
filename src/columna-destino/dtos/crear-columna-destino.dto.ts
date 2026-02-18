import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsBoolean, IsNumber, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearColumnaDestinoDto {
  @ApiProperty({ example: 'precio_unitario', description: 'Nombre de la columna destino' })
  @IsString()
  @IsNotEmpty()
  nombreColumna: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID del destino de datos' })
  @IsUUID()
  @IsNotEmpty()
  destinoId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'ID del tipo de dato' })
  @IsUUID()
  @IsNotEmpty()
  tipoDatoId: string;

  @ApiProperty({ example: 1, description: 'Posicion ordinal de la columna', required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  posicionOrdinal?: number;

  @ApiProperty({ example: true, description: 'Indica si la columna acepta nulos', required: false })
  @IsBoolean()
  @IsOptional()
  esNullable?: boolean;

  @ApiProperty({ example: false, description: 'Indica si contiene datos de identificacion personal (PII)', required: false })
  @IsBoolean()
  @IsOptional()
  esPii?: boolean;

  @ApiProperty({ example: false, description: 'Indica si el valor debe transformarse en mayusculas/minusculas', required: false })
  @IsBoolean()
  @IsOptional()
  obligaCase?: boolean;

  @ApiProperty({ example: 'YYYY-MM-DD', description: 'Formato esperado del valor', required: false })
  @IsString()
  @IsOptional()
  formatoEsperado?: string;
}
