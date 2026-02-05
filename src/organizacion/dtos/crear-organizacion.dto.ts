import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearOrganizacionDto {
  @ApiProperty({ example: 'ORG-001', description: 'Codigo unico de la organizacion' })
  @IsString()
  @IsNotEmpty()
  codigoOrg: string;

  @ApiProperty({ example: 'Olimpica S.A.', description: 'Nombre de la organizacion' })
  @IsString()
  @IsNotEmpty()
  nombreOrg: string;

  @ApiProperty({ example: 'Olimpica S.A.S.', description: 'Razon social' })
  @IsString()
  @IsNotEmpty()
  razonSocial: string;

  @ApiProperty({ example: '890900000-1', description: 'NIT de la organizacion' })
  @IsString()
  @IsNotEmpty()
  nit: string;

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

  @ApiProperty({ example: 1, description: 'ID de organizacion padre', required: false })
  @IsOptional()
  perteneceA?: number;
}
