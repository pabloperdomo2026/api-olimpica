import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarParametroGlobalDto {
  @ApiProperty({ example: 'Numero maximo de reintentos', description: 'Descripcion del parametro', required: false })
  @IsString()
  @IsOptional()
  itemDescripcion?: string;

  @ApiProperty({ example: '5', description: 'Valor del parametro', required: false })
  @IsString()
  @IsOptional()
  valorRetornar?: string;

  @ApiProperty({ example: false, description: 'Si es valor por defecto', required: false })
  @IsBoolean()
  @IsOptional()
  esDefecto?: boolean;
}
