import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CrearMensajeErrorDto {
  @ApiProperty({ example: 'ERR_CONN_TIMEOUT', description: 'Codigo unico del error' })
  @IsString()
  @IsNotEmpty()
  codigoError: string;

  @ApiProperty({ example: 'Error de conexion por timeout', description: 'Nombre del mensaje de error' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 1, description: 'ID de categoria del error', required: false })
  @IsNumber()
  @IsOptional()
  categoriaErrorId?: number;

  @ApiProperty({ example: 'La conexion con {origen} supero el tiempo limite de {timeout}ms', description: 'Plantilla del mensaje', required: false })
  @IsString()
  @IsOptional()
  mensajePlantilla?: string;

  @ApiProperty({ example: 'ALTA', description: 'Severidad del error: CRITICA, ALTA, MEDIA, BAJA', required: false })
  @IsString()
  @IsOptional()
  severidad?: string;

  @ApiProperty({ example: 504, description: 'Codigo HTTP sugerido', required: false })
  @IsNumber()
  @IsOptional()
  codigoHttpSugerido?: number;

  @ApiProperty({ example: true, description: 'Si el error es recuperable', required: false })
  @IsBoolean()
  @IsOptional()
  esRecuperable?: boolean;
}
