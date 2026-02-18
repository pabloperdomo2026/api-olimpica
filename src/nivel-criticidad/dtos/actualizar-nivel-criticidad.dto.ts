import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class ActualizarNivelCriticidadDto {
  @ApiProperty({ example: 'Critico', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 5, required: false })
  @IsNumber()
  @IsOptional()
  nivelNumerico?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
