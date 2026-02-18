import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CrearNivelCriticidadDto {
  @ApiProperty({ example: 'CRITICO', description: 'Codigo unico del nivel de criticidad' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Critico', description: 'Nombre del nivel de criticidad' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 5, description: 'Nivel numerico de criticidad (mayor = mas critico)' })
  @IsNumber()
  nivelNumerico: number;
}
