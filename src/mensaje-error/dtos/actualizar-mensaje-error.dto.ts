import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class ActualizarMensajeErrorDto {
  @ApiProperty({ example: 'Error de conexion por timeout', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  categoriaErrorId?: number;

  @ApiProperty({ example: 'La conexion con {origen} supero el tiempo limite de {timeout}ms', required: false })
  @IsString()
  @IsOptional()
  mensajePlantilla?: string;

  @ApiProperty({ example: 'ALTA', required: false })
  @IsString()
  @IsOptional()
  severidad?: string;

  @ApiProperty({ example: 504, required: false })
  @IsNumber()
  @IsOptional()
  codigoHttpSugerido?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  esRecuperable?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
