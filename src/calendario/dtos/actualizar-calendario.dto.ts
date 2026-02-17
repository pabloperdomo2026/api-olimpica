import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';

export class ActualizarCalendarioDto {
  @ApiProperty({ example: 'CO', description: 'Codigo del pais', required: false })
  @IsString()
  @IsOptional()
  pais?: string;

  @ApiProperty({ example: '2026-01-01', description: 'Fecha del calendario', required: false })
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @ApiProperty({ example: 2026, description: 'Anio', required: false })
  @IsNumber()
  @IsOptional()
  anio?: number;

  @ApiProperty({ example: 1, description: 'Mes', required: false })
  @IsNumber()
  @IsOptional()
  mes?: number;

  @ApiProperty({ example: 1, description: 'Dia', required: false })
  @IsNumber()
  @IsOptional()
  dia?: number;

  @ApiProperty({ example: false, description: 'Es fin de semana', required: false })
  @IsOptional()
  esFinSemana?: boolean;

  @ApiProperty({ example: true, description: 'Es festivo', required: false })
  @IsOptional()
  esFestivo?: boolean;

  @ApiProperty({ example: true, description: 'Es dia laboral', required: false })
  @IsOptional()
  esDiaLaboral?: boolean;
}
