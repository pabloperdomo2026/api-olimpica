import { IsEmail, IsNotEmpty, IsString, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerificarOtpDto {
  @ApiProperty({ example: 'usuario@olimpica.com' })
  @IsEmail({}, { message: 'El correo electronico no es valido' })
  @IsNotEmpty({ message: 'El correo electronico es requerido' })
  correo: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @Length(4, 4, { message: 'El codigo debe tener exactamente 4 digitos' })
  @Matches(/^\d{4}$/, { message: 'El codigo debe ser numerico' })
  codigo: string;
}
