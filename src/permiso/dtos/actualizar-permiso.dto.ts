import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ActualizarPermisoDto {
  @ApiProperty({ example: 'Crear Usuario', description: 'Nombre del permiso', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Permite crear nuevos usuarios en el sistema', description: 'Descripcion del permiso', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'S', description: 'Estado activo (S/N)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;
}
