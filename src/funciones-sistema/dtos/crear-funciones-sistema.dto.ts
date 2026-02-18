import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearFuncionesSistemaDto {
  @ApiProperty({ example: 'FN_DASHBOARD', description: 'Codigo unico de la funcion' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Dashboard', description: 'Nombre de la funcion' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Acceso al panel de dashboards', description: 'Descripcion de la funcion', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
