import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class ActualizarOrganizacionDto {
  @ApiProperty({ example: 'Olimpica S.A.', description: 'Nombre de la organizacion', required: false })
  @IsString()
  @IsOptional()
  nombreOrg?: string;

  @ApiProperty({ example: 'Olimpica S.A.S.', description: 'Razon social', required: false })
  @IsString()
  @IsOptional()
  razonSocial?: string;

  @ApiProperty({ example: 'Colombia', description: 'Pais', required: false })
  @IsString()
  @IsOptional()
  pais?: string;

  @ApiProperty({ example: 'Barranquilla', description: 'Ciudad', required: false })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiProperty({ example: 'Calle 30 # 43-50', description: 'Direccion', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({ example: '+57 5 3600000', description: 'Telefono de contacto', required: false })
  @IsString()
  @IsOptional()
  telefonoContacto?: string;

  @ApiProperty({ example: 'contacto@olimpica.com', description: 'Email de contacto', required: false })
  @IsEmail()
  @IsOptional()
  emailContacto?: string;

  @ApiProperty({ example: 'S', description: 'Estado activo (S/N)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;

  @ApiProperty({ example: 1, description: 'ID de organizacion padre', required: false })
  @IsOptional()
  perteneceA?: number;
}
