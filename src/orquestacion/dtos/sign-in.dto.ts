import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'admin@olimpica.com', description: 'Correo electronico' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123', description: 'Contrasena del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
