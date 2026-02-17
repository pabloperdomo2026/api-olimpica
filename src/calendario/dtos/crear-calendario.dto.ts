import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class CrearCalendarioDto {
  @ApiProperty({ example: 'CO', description: 'Codigo del pais' })
  @IsString()
  @IsNotEmpty()
  pais: string;

  @ApiProperty({ example: '2026-01-01', description: 'Fecha del calendario' })
  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty({ example: 2026, description: 'Anio' })
  @IsNumber()
  @IsNotEmpty()
  anio: number;

  @ApiProperty({ example: 1, description: 'Mes' })
  @IsNumber()
  @IsNotEmpty()
  mes: number;

  @ApiProperty({ example: 1, description: 'Dia' })
  @IsNumber()
  @IsNotEmpty()
  dia: number;

  @ApiProperty({ example: false, description: 'Es fin de semana', required: false })
  @IsOptional()
  esFinSemana?: boolean;

  @ApiProperty({ example: true, description: 'Es festivo', required: false })
  @IsOptional()
  esFestivo?: boolean;

  @ApiProperty({ example: true, description: 'Es dia laboral', required: false })
  @IsOptional()
  esDiaLaboral?: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID de la organizacion' })
  @IsUUID()
  @IsNotEmpty()
  organizacionId: string;
}
