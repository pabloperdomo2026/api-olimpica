import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ActualizarProveedorCloudDto {
  @ApiProperty({ example: 'Amazon Web Services', description: 'Nombre del proveedor cloud', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'https://console.aws.amazon.com', description: 'URL base del proveedor', required: false })
  @IsString()
  @IsOptional()
  urlBase?: string;

  @ApiProperty({ example: 'A', description: 'Estado del proveedor (A=Activo, I=Inactivo)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;
}
