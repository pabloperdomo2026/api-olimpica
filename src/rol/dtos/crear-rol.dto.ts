import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearRolDto {
  @ApiProperty({ example: 'ADMIN', description: 'Codigo unico del rol' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Administrador', description: 'Nombre del rol' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Rol con acceso total al sistema', description: 'Descripcion del rol', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
