import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarTipoDatoDto {
  @ApiProperty({ example: 'Cadena de texto variable', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'VARCHAR(255)', required: false })
  @IsString()
  @IsOptional()
  tipoSql?: string;

  @ApiProperty({ example: 'str', required: false })
  @IsString()
  @IsOptional()
  tipoPython?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
