import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CrearTipoProgramacionDto {
  @ApiProperty({ example: 'CRON', description: 'Codigo unico del tipo de programacion' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Cron Job', description: 'Nombre del tipo de programacion' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: true, description: 'Si requiere expresion cron', required: false })
  @IsBoolean()
  @IsOptional()
  requiereCron?: boolean;
}
