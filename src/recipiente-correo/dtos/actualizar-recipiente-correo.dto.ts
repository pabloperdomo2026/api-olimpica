import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class ActualizarRecipienteCorreoDto {
  @ApiPropertyOptional({ description: 'Nombre del recipiente', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombre?: string;

  @ApiPropertyOptional({ description: 'Descripcion', maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Tipo de recipiente', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipoRecipiente?: string;

  @ApiPropertyOptional({ description: 'ARN del topico SNS', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  arnSns?: string;

  @ApiPropertyOptional({ description: 'ARN de la cola SQS', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  arnSqs?: string;

  @ApiPropertyOptional({ description: 'Emails destino separados por coma', maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  emailsDestino?: string;

  @ApiPropertyOptional({ description: 'Region AWS', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  regionAws?: string;

  @ApiPropertyOptional({ description: 'Estado activo/inactivo' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
