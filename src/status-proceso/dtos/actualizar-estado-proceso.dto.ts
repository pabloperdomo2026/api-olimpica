import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarEstadoProcesoDto {
  @ApiProperty({ example: 'En ejecucion', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  esInicial?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  esFinal?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  esExitoso?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  esError?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
