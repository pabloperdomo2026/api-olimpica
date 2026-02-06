import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class CrearFrameworkOrquestacionDto {
  @ApiProperty({
    description: 'Nombre de la Step Function a ejecutar',
    example: 'mi-step-function-framework',
  })
  @IsNotEmpty()
  @IsString()
  stepFunctionName: string;

  @ApiProperty({
    description: 'Datos a enviar como input a la Step Function',
    example: { key: 'value', otroCampo: 'otroValor' },
  })
  @IsNotEmpty()
  @IsObject()
  data: Record<string, unknown>;
}
