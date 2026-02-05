import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ActualizarRolDto {
  @ApiProperty({ example: 'Administrador', description: 'Nombre del rol', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Rol con acceso total al sistema', description: 'Descripcion del rol', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'S', description: 'Estado activo (S/N)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;
}
