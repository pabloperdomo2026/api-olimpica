import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, MaxLength } from 'class-validator';

export class ActualizarProgramacionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  expresionCron?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  frecuenciaMinutos?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  activo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  usuarioModificacion?: string;
}
