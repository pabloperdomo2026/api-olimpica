import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsInt, IsBoolean, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ActualizarColumnaOrigenDto {
  @ApiPropertyOptional({ description: 'Nombre de la columna en la fuente', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreColumna?: string;

  @ApiPropertyOptional({ description: 'ID del tipo de dato (UUID)' })
  @IsOptional()
  @IsUUID()
  tipoDatoId?: string;

  @ApiPropertyOptional({ description: 'Posicion ordinal de la columna' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  posicionOrdinal?: number;

  @ApiPropertyOptional({ description: 'La columna acepta valores nulos' })
  @IsOptional()
  @IsBoolean()
  esNullable?: boolean;

  @ApiPropertyOptional({ description: 'La columna contiene informacion personal identificable' })
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

  @ApiPropertyOptional({ description: 'Estado activo/inactivo' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
