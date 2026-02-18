import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsInt, IsNumber, MaxLength, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearFuenteDatosDto {
  @ApiProperty({ description: 'Código único de la fuente de datos', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  codigo: string;

  @ApiProperty({ description: 'Nombre de la fuente de datos', maxLength: 200 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  nombre: string;

  @ApiProperty({ description: 'ID de la organización (UUID)' })
  @IsNotEmpty()
  @IsUUID()
  organizacionId: string;

  @ApiProperty({ description: 'ID del tipo de fuente (UUID)' })
  @IsNotEmpty()
  @IsUUID()
  tipoFuenteId: string;

  @ApiPropertyOptional({ description: 'Host o servidor de la fuente', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  host?: string;

  @ApiPropertyOptional({ description: 'Puerto de conexión (1-65535)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  puerto?: number;

  @ApiPropertyOptional({ description: 'Nombre de la base de datos', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombreBaseDatos?: string;

  @ApiPropertyOptional({ description: 'Usuario de conexión', maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  usuario?: string;

  @ApiPropertyOptional({ description: 'Contraseña de conexión (se almacena encriptada)', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  password?: string;

  @ApiPropertyOptional({ description: 'Parámetros adicionales en formato JSON' })
  @IsOptional()
  @IsString()
  parametrosJson?: string;

  @ApiProperty({ description: 'Tiempo de retención de datos en días' })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  tiempoRetencion: number;
}
