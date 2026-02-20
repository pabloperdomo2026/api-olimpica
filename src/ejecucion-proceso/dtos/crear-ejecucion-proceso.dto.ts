import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsNotEmpty } from 'class-validator';

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
}
