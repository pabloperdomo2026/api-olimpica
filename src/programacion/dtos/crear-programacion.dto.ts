import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber, MaxLength } from 'class-validator';

export class CrearProgramacionDto {
  @ApiProperty()
  @IsUUID()
  procesoId: string;

  @ApiProperty()
  @IsUUID()
  tipoProgramacionId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  nombre: string;

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
  @MaxLength(100)
  usuarioCreacion?: string;
}
