import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../usuario/usuario.repository';

interface SignIn {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  usuario: {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    organizacionId: string;
  };
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: SignIn): Promise<LoginResponse> {
    const usuario = await this.usuarioRepository.obtenerPorEmail(data.email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const passwordValido = await bcrypt.compare(data.password, usuario.passwordHash);

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      organizacionId: usuario.organizacionId,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        organizacionId: usuario.organizacionId,
      },
    };
  }
}
