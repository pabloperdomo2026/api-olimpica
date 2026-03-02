import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../usuario/usuario.repository';
import { OtpRepository } from '../repositories/otp.repository';

@Injectable()
export class VerificarOtpUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly otpRepository: OtpRepository,
  ) {}

  async execute(correo: string, codigo: string): Promise<{ valido: boolean }> {
    const usuario = await this.usuarioRepository.obtenerPorEmail(correo);
    if (!usuario) return { valido: false };

    const otp = await this.otpRepository.buscarPorCodigoYUsuario(usuario.id, codigo);
    if (!otp) return { valido: false };

    if (new Date() > otp.fechaExpiracion) {
      await this.otpRepository.marcarComoUsado(otp.otpId);
      return { valido: false };
    }

    // No se marca como usado — el OTP sigue vigente para actualizar la contrasena
    return { valido: true };
  }
}
