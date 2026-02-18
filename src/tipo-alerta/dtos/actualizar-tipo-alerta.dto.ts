import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarTipoAlertaDto {
  @ApiProperty({ example: 'Alerta por correo electronico', description: 'Nombre del tipo de alerta', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'ALTA', description: 'Severidad de la alerta', required: false })
  @IsString()
  @IsOptional()
  severidad?: string;

  @ApiProperty({ example: true, description: 'Si esta activo', required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
