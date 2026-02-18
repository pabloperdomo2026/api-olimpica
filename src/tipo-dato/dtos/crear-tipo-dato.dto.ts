import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearTipoDatoDto {
  @ApiProperty({ example: 'VARCHAR', description: 'Codigo unico del tipo de dato' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Cadena de texto variable', description: 'Nombre del tipo de dato' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'VARCHAR(255)', description: 'Equivalente en SQL', required: false })
  @IsString()
  @IsOptional()
  tipoSql?: string;

  @ApiProperty({ example: 'str', description: 'Equivalente en Python', required: false })
  @IsString()
  @IsOptional()
  tipoPython?: string;
}
