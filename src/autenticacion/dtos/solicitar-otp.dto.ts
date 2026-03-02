import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SolicitarOtpDto {
  @ApiProperty({ example: 'usuario@olimpica.com', description: 'Correo electronico del usuario' })
  @IsEmail({}, { message: 'El correo electronico no es valido' })
  @IsNotEmpty({ message: 'El correo electronico es requerido' })
  correo: string;
}
