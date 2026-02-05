import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearUsuarioDto {
  @ApiProperty({ example: 1, description: 'ID de la organizacion' })
  @IsString()
  @IsNotEmpty()
  organizacionId: string;

  @ApiProperty({ example: 'usuario@olimpica.com', description: 'Correo electronico' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123', description: 'Contrasena del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Perez', description: 'Apellido del usuario', required: false })
  @IsString()
  @IsOptional()
  apellido?: string;
}
