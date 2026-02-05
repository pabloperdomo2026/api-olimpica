import { ApiProperty } from '@nestjs/swagger';

export class ActualizarUsuarioDto {
  @ApiProperty({ example: 'usuario@olimpica.com', description: 'Correo electronico', required: false })
  email?: string;

  @ApiProperty({ example: 'NuevoPassword123', description: 'Nueva contrasena', required: false })
  password?: string;

  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario', required: false })
  nombre?: string;

  @ApiProperty({ example: 'Perez', description: 'Apellido del usuario', required: false })
  apellido?: string;

  @ApiProperty({ example: true, description: 'Estado del usuario', required: false })
  activo?: boolean;
}
