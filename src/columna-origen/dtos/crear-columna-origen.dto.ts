import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsInt, IsBoolean, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearColumnaOrigenDto {
  @ApiProperty({ description: 'Nombre de la columna en la fuente', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  nombreColumna: string;

  @ApiProperty({ description: 'ID de la fuente de datos (UUID)' })
  @IsNotEmpty()
  @IsUUID()
  fuenteId: string;

  @ApiProperty({ description: 'ID del tipo de dato (UUID)' })
  @IsNotEmpty()
  @IsUUID()
  tipoDatoId: string;

  @ApiPropertyOptional({ description: 'Posicion ordinal de la columna' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  posicionOrdinal?: number;

  @ApiPropertyOptional({ description: 'La columna acepta valores nulos', default: true })
  @IsOptional()
  @IsBoolean()
  esNullable?: boolean;

  @ApiPropertyOptional({ description: 'La columna contiene informacion personal identificable', default: false })
  @IsOptional()
  @IsBoolean()
  esPii?: boolean;

  @ApiPropertyOptional({ description: 'Obliga transformacion de case en el valor' })
  @IsOptional()
  @IsBoolean()
  obligaCase?: boolean;

  @ApiPropertyOptional({ description: 'Formato esperado del valor de la columna', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  formatoEsperado?: string;
}
