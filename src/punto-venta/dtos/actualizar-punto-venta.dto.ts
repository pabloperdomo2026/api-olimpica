import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ActualizarPuntoVentaDto {
  @ApiProperty({ example: 'Olimpica Barranquilla Centro', description: 'Nombre de la tienda', required: false })
  @IsString()
  @IsOptional()
  nombreTienda?: string;

  @ApiProperty({ example: 'Barranquilla', description: 'Ciudad donde se ubica la tienda', required: false })
  @IsString()
  @IsOptional()
  ciudad?: string;

  @ApiProperty({ example: 'Calle 30 # 43-50', description: 'Direccion de la tienda', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({ example: 'S', description: 'Estado activo (S/N)', required: false })
  @IsString()
  @IsOptional()
  activo?: string;
}
