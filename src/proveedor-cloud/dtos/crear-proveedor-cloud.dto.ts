import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CrearProveedorCloudDto {
  @ApiProperty({ example: 'AWS', description: 'Codigo unico del proveedor cloud' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Amazon Web Services', description: 'Nombre del proveedor cloud' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'https://console.aws.amazon.com', description: 'URL base del proveedor' })
  @IsString()
  @IsNotEmpty()
  urlBase: string;
}
