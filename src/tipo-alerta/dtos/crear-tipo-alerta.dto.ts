import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearTipoAlertaDto {
  @ApiProperty({ example: 'EMAIL', description: 'Codigo unico del tipo de alerta' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Alerta por correo electronico', description: 'Nombre del tipo de alerta' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'ALTA', description: 'Severidad de la alerta', required: false })
  @IsString()
  @IsOptional()
  severidad?: string;
}
