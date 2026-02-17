import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CrearParametroGlobalDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID de la organizacion' })
  @IsUUID()
  @IsNotEmpty()
  organizacionId: string;

  @ApiProperty({ example: 'REINTENTOS', description: 'Grupo del parametro' })
  @IsString()
  @IsNotEmpty()
  itemGrupo: string;

  @ApiProperty({ example: 'MAX_REINTENTOS', description: 'Atributo del parametro' })
  @IsString()
  @IsNotEmpty()
  itemAtributo: string;

  @ApiProperty({ example: 'Numero maximo de reintentos', description: 'Descripcion del parametro' })
  @IsString()
  @IsNotEmpty()
  itemDescripcion: string;

  @ApiProperty({ example: '3', description: 'Valor del parametro' })
  @IsString()
  @IsNotEmpty()
  valorRetornar: string;

  @ApiProperty({ example: false, description: 'Si es valor por defecto', required: false })
  @IsBoolean()
  @IsOptional()
  esDefecto?: boolean;
}
