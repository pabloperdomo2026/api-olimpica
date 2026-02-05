import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CrearPuntoVentaDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID de la organizacion' })
  @IsUUID()
  @IsNotEmpty()
  organizacionId: string;

  @ApiProperty({ example: 'TDA-001', description: 'Codigo unico de la tienda' })
  @IsString()
  @IsNotEmpty()
  codigoTienda: string;

  @ApiProperty({ example: 'Olimpica Barranquilla Centro', description: 'Nombre de la tienda' })
  @IsString()
  @IsNotEmpty()
  nombreTienda: string;

  @ApiProperty({ example: 'Barranquilla', description: 'Ciudad donde se ubica la tienda', required: false })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiProperty({ example: 'Calle 30 # 43-50', description: 'Direccion de la tienda', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;
}
