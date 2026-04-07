import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsNotEmpty, IsDateString, IsInt, Min, Max } from 'class-validator';

export class CrearEjecucionProcesoDto {
  @ApiProperty({ description: 'ID del proceso a ejecutar (UUID)' })
  @IsUUID()
  @IsNotEmpty()
  procesoId: string;

  @ApiPropertyOptional({ description: 'Tipo de ejecucion', default: 'MANUAL' })
  @IsString()
  @IsOptional()
  tipoEjecucion?: string;

  @ApiPropertyOptional({ description: 'Usuario que solicita la ejecucion' })
  @IsString()
  @IsOptional()
  usuarioSolicita?: string;

  @ApiPropertyOptional({ description: 'Fecha de inicio explícita (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @ApiPropertyOptional({ description: 'Fecha de fin explícita (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  fechaFin?: string;

  @ApiPropertyOptional({ description: 'Días hacia atrás desde hoy para fecha de inicio' })
  @IsInt()
  @Min(0)
  @IsOptional()
  deltaInicio?: number;

  @ApiPropertyOptional({ description: 'Días hacia atrás desde hoy para fecha de fin' })
  @IsInt()
  @Min(0)
  @IsOptional()
  deltaFin?: number;

  @ApiPropertyOptional({ description: 'Día del mes para fecha de inicio (1-31)' })
  @IsInt()
  @Min(1)
  @Max(31)
  @IsOptional()
  diaInicial?: number;

  @ApiPropertyOptional({ description: 'Día del mes para fecha de fin (1-31)' })
  @IsInt()
  @Min(1)
  @Max(31)
  @IsOptional()
  diaFinal?: number;

  @ApiPropertyOptional({ description: 'Umbral de semanas para determinar mes anterior vs actual' })
  @IsInt()
  @Min(1)
  @IsOptional()
  numSemanasUmbral?: number;
}
