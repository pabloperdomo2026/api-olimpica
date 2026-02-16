import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class ActualizarUsuarioDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Perez', description: 'Apellido del usuario', required: false })
  @IsString()
  @IsOptional()
  apellido?: string;

  @ApiProperty({ example: true, description: 'Estado del usuario', required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
