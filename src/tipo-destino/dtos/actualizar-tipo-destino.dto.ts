import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarTipoDestinoDto {
  @ApiProperty({ example: 'API REST', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Destino tipo API REST', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'API', required: false })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  requiereCredenciales?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
