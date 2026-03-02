import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../usuario/usuario.repository';
import { OtpRepository } from '../repositories/otp.repository';

@Injectable()
export class ActualizarContrasenaUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly otpRepository: OtpRepository,
  ) {}

  async execute(correo: string, codigo: string, nuevaContrasena: string): Promise<{ mensaje: string }> {
    const usuario = await this.usuarioRepository.obtenerPorEmail(correo);
    if (!usuario) {
      throw new NotFoundException('No existe una cuenta registrada con ese correo electronico');
    }

    const otp = await this.otpRepository.buscarPorCodigoYUsuario(usuario.id, codigo);
    if (!otp) {
      throw new UnauthorizedException('Codigo invalido o ya utilizado');
    }

    if (new Date() > otp.fechaExpiracion) {
      await this.otpRepository.marcarComoUsado(otp.otpId);
      throw new UnauthorizedException('El codigo ha expirado. Solicita uno nuevo');
    }

    const passwordHash = await bcrypt.hash(nuevaContrasena, 10);
    await this.usuarioRepository.actualizar(usuario.id, { passwordHash });
    await this.otpRepository.marcarComoUsado(otp.otpId);

    return { mensaje: 'Contrasena actualizada correctamente' };
  }
}
