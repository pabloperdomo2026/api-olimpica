import {
  IsString,
  IsUUID,
  IsOptional,
  IsInt,
  IsNumber,
  IsBoolean,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ActualizarProcesoMapeoCampoDto {
  @ApiPropertyOptional({ description: 'Nombre de la columna en el mapeo' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreColumna?: string;

  @ApiPropertyOptional({ description: 'Nombre del campo en el destino' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreCampoDestino?: string;

  @ApiPropertyOptional({ description: 'Tipo de expresion de transformacion' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  tipoExpresion?: string;

  @ApiPropertyOptional({ description: 'ID del proceso' })
  @IsOptional()
  @IsUUID()
  procesoId?: string;

  @ApiPropertyOptional({ description: 'ID de la columna origen' })
  @IsOptional()
  @IsUUID()
  columnaOrigenId?: string;

  @ApiPropertyOptional({ description: 'ID de la columna destino' })
  @IsOptional()
  @IsUUID()
  columnaDestinoId?: string;

  @ApiPropertyOptional({ description: 'Secuencia de generacion tabular' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  secuenciaGeneracionTabular?: number;

  @ApiPropertyOptional({ description: 'Posicion ordinal en el esquema' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  posicionOrdinal?: number;

  @ApiPropertyOptional({ description: 'Indica si el campo acepta nulos' })
  @IsOptional()
  @IsBoolean()
  esNullable?: boolean;

  @ApiPropertyOptional({ description: 'Indica si contiene informacion de identificacion personal' })
  @IsOptional()
  @IsBoolean()
  esPii?: boolean;

  @ApiPropertyOptional({ description: 'Nombre del campo en el origen' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreCampoOrigen?: string;

  @ApiPropertyOptional({ description: 'Indica si el destino obliga transformacion de case' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  destinoObligaCase?: number;

  @ApiPropertyOptional({ description: 'Formato esperado en el origen' })
  @IsOptional()
  @IsString()
  formatoOrigen?: string;

  @ApiPropertyOptional({ description: 'Formato esperado en el destino' })
  @IsOptional()
  @IsString()
  formatoDestino?: string;

  @ApiPropertyOptional({ description: 'Expresion de transformacion' })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  expresionTransformacion?: string;

  @ApiPropertyOptional({ description: 'Estado del mapeo' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
