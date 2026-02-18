import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CrearTipoFuenteDto {
  @ApiProperty({ example: 'REDSHIFT', description: 'Codigo unico del tipo de fuente' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Amazon Redshift', description: 'Nombre del tipo de fuente' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Fuente de datos tipo Amazon Redshift', description: 'Descripcion del tipo de fuente', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'DATABASE', description: 'Categoria del tipo de fuente', required: false })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiProperty({ example: true, description: 'Si requiere credenciales de acceso', required: false })
  @IsBoolean()
  @IsOptional()
  requiereCredenciales?: boolean;
}
