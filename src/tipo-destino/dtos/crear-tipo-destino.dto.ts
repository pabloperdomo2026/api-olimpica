import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CrearTipoDestinoDto {
  @ApiProperty({ example: 'API_REST', description: 'Codigo unico del tipo de destino' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'API REST', description: 'Nombre del tipo de destino' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Destino tipo API REST para envio de datos', description: 'Descripcion del tipo de destino', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'API', description: 'Categoria del tipo de destino', required: false })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiProperty({ example: true, description: 'Si requiere credenciales de acceso', required: false })
  @IsBoolean()
  @IsOptional()
  requiereCredenciales?: boolean;
}
