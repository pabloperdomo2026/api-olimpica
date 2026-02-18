import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CrearEstadoProcesoDto {
  @ApiProperty({ example: 'EN_EJECUCION', description: 'Codigo unico del estado' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'En ejecucion', description: 'Nombre del estado' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: true, description: 'Es estado inicial', required: false })
  @IsBoolean()
  @IsOptional()
  esInicial?: boolean;

  @ApiProperty({ example: false, description: 'Es estado final', required: false })
  @IsBoolean()
  @IsOptional()
  esFinal?: boolean;

  @ApiProperty({ example: false, description: 'Es estado exitoso', required: false })
  @IsBoolean()
  @IsOptional()
  esExitoso?: boolean;

  @ApiProperty({ example: false, description: 'Es estado de error', required: false })
  @IsBoolean()
  @IsOptional()
  esError?: boolean;
}
