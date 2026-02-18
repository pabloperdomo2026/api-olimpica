import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarTipoFuenteDto {
  @ApiProperty({ example: 'Amazon Redshift', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Fuente de datos tipo Amazon Redshift', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'DATABASE', required: false })
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
