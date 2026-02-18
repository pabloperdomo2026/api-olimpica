import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarFuncionesSistemaDto {
  @ApiProperty({ example: 'Dashboard', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'Acceso al panel de dashboards', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
