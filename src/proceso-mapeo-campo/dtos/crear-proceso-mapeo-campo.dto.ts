import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsInt,
  IsNumber,
  IsBoolean,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CrearProcesoMapeoCampoDto {
  @ApiProperty({ description: 'Nombre de la columna en el mapeo' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombreColumna: string;

  @ApiProperty({ description: 'Nombre del campo en el destino' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombreCampoDestino: string;

  @ApiProperty({ description: 'Tipo de expresion de transformacion' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipoExpresion: string;

  @ApiProperty({ description: 'ID del proceso' })
  @IsUUID()
  @IsNotEmpty()
  procesoId: string;

  @ApiProperty({ description: 'ID de la columna origen' })
  @IsUUID()
  @IsNotEmpty()
  columnaOrigenId: string;

  @ApiProperty({ description: 'ID de la columna destino' })
  @IsUUID()
  @IsNotEmpty()
  columnaDestinoId: string;

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

  @ApiPropertyOptional({ description: 'Indica si el campo acepta nulos', default: true })
  @IsOptional()
  @IsBoolean()
  esNullable?: boolean;

  @ApiPropertyOptional({ description: 'Indica si contiene informacion de identificacion personal', default: false })
  @IsOptional()
  @IsBoolean()
  esPii?: boolean;

  @ApiPropertyOptional({ description: 'Nombre del campo en el origen' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreCampoOrigen?: string;

  @ApiPropertyOptional({ description: 'Indica si el destino obliga transformacion de case (0=ninguno, 1=upper, 2=lower)' })
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

  @ApiPropertyOptional({ description: 'Expresion de transformacion (SQL, regex, etc.)' })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  expresionTransformacion?: string;
}
