import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearConfiguracionAlertaDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  tipoAlertaId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  procesoId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  recipienteId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  templateMensaje: string;

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
}
