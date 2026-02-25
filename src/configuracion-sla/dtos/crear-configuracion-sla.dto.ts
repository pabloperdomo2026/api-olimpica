import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearConfiguracionSlaDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  procesoId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre: string;

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
}
