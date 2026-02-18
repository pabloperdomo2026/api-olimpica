import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearTasaCambioDto {
  @ApiProperty({ example: 1, description: 'ID de la moneda origen' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  monedaOrigenId: number;

  @ApiProperty({ example: 2, description: 'ID de la moneda destino' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  monedaDestinoId: number;

  @ApiProperty({ example: 4000.5, description: 'Valor de la tasa de cambio' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @Type(() => Number)
  tasaCambio: number;

  @ApiProperty({ example: '2025-01-01', description: 'Fecha desde la cual es vigente', required: false })
  @IsDateString()
  @IsOptional()
  fechaVigenciaDesde?: string;

  @ApiProperty({ example: '2025-12-31', description: 'Fecha hasta la cual es vigente', required: false })
  @IsDateString()
  @IsOptional()
  fechaVigenciaHasta?: string;

  @ApiProperty({ example: 'Banco de la Republica', description: 'Fuente de la tasa', required: false })
  @IsString()
  @IsOptional()
  fuenteTasa?: string;
}
