import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearPermisoDto {
  @ApiProperty({ example: 'CREAR_USUARIO', description: 'Codigo unico del permiso' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Crear Usuario', description: 'Nombre del permiso' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Permite crear nuevos usuarios en el sistema', description: 'Descripcion del permiso', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
