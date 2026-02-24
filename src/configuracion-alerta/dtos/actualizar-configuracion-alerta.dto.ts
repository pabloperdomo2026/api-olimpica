import { IsString, IsOptional, MaxLength, IsNumber, IsBoolean, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ActualizarConfiguracionAlertaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  tipoAlertaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  procesoId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  recipienteId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  templateMensaje?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  condicionDisparo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tiempoEvaluacion?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  umbralValor?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
