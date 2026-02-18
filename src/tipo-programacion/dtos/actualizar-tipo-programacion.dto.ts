import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class ActualizarTipoProgramacionDto {
  @ApiProperty({ example: 'Cron Job', required: false })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  requiereCron?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
