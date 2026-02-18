import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarTipoProcesoDto {
  @ApiProperty({ example: 'ETL Batch', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Proceso de extraccion, transformacion y carga en batch', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
