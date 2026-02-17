import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CrearMonedaDto {
  @ApiProperty({ example: 'COP', description: 'Codigo unico de la moneda' })
  @IsString()
  @IsNotEmpty()
  codigoMoneda: string;

  @ApiProperty({ example: 'COP', description: 'Codigo ISO 4217 de 3 caracteres' })
  @IsString()
  @IsNotEmpty()
  codigoIso4217: string;

  @ApiProperty({ example: 'Peso Colombiano', description: 'Nombre de la moneda' })
  @IsString()
  @IsNotEmpty()
  nombreMoneda: string;

  @ApiProperty({ example: '$', description: 'Simbolo de la moneda', required: false })
  @IsString()
  @IsOptional()
  simboloMoneda?: string;

  @ApiProperty({ example: 2, description: 'Numero de decimales', required: false })
  @IsNumber()
  @IsOptional()
  numeroDecimales?: number;

  @ApiProperty({ example: false, description: 'Si es la moneda base del sistema', required: false })
  @IsBoolean()
  @IsOptional()
  esMonedaBase?: boolean;
}
