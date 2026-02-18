import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearTipoProcesoDto {
  @ApiProperty({ example: 'ETL', description: 'Codigo unico del tipo de proceso' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'ETL Batch', description: 'Nombre del tipo de proceso' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Proceso de extraccion, transformacion y carga en batch', description: 'Descripcion del tipo de proceso', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
