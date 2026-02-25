import { IsString, IsOptional, MaxLength, IsNumber, IsBoolean, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ActualizarConfiguracionSlaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  procesoId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tiempoMaximoEjecucionMinutos?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  horaLimiteFinalizacion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  porcentajeRegistrosMinimo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  umbralErrorPorcentaje?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
