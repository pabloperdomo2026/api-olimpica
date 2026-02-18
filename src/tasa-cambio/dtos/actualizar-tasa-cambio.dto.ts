import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsDateString, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ActualizarTasaCambioDto {
  @ApiProperty({ example: 4100.25, description: 'Nuevo valor de la tasa de cambio', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  tasaCambio?: number;

  @ApiProperty({ example: '2025-01-01', description: 'Fecha de inicio de vigencia', required: false })
  @IsDateString()
  @IsOptional()
  fechaVigenciaDesde?: string;

  @ApiProperty({ example: '2025-12-31', description: 'Fecha de fin de vigencia', required: false })
  @IsDateString()
  @IsOptional()
  fechaVigenciaHasta?: string;

  @ApiProperty({ example: 'Banco de la Republica', description: 'Fuente de la tasa', required: false })
  @IsString()
  @IsOptional()
  fuenteTasa?: string;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
