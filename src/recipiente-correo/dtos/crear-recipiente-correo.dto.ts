import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CrearRecipienteCorreoDto {
  @ApiProperty({ description: 'Codigo unico del recipiente', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  codigo: string;

  @ApiProperty({ description: 'Nombre del recipiente', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  nombre: string;

  @ApiPropertyOptional({ description: 'Descripcion', maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Tipo de recipiente (EMAIL, SNS, SQS)', maxLength: 50 })
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

  @ApiProperty({ description: 'ID de la organizacion (UUID)' })
  @IsNotEmpty()
  @IsUUID()
  organizacionId: string;
}
