import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearEventoEjecucionDto {
  @ApiProperty({ description: 'ID de la ejecucion a actualizar (UUID)' })
  @IsUUID()
  @IsNotEmpty()
  ejecucionId: string;

  @ApiProperty({
    description: 'Codigo del nuevo estado del proceso (ej: EN_EJECUCION, TERMINADO, FALLIDO)',
  })
  @IsString()
  @IsNotEmpty()
  estadoCodigo: string;

  @ApiPropertyOptional({ description: 'Mensaje descriptivo del evento' })
  @IsString()
  @IsOptional()
  mensaje?: string;

  @ApiPropertyOptional({ description: 'Total de registros procesados' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  numeroRegistrosProcesados?: number;

  @ApiPropertyOptional({ description: 'Registros procesados exitosamente' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  numeroRegistrosExitosos?: number;

  @ApiPropertyOptional({ description: 'Registros que fallaron' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  numeroRegistrosFallidos?: number;

  @ApiPropertyOptional({ description: 'Duracion total en segundos' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  duracionSegundos?: number;
}
