import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class ActualizarMonedaDto {
  @ApiProperty({ example: 'Peso Colombiano', description: 'Nombre de la moneda', required: false })
  @IsString()
  @IsOptional()
  nombreMoneda?: string;

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

  @ApiProperty({ example: 'S', description: 'Estado activo (S/N)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;
}
