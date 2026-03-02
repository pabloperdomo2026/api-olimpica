import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../usuario/usuario.repository';
import { CorreoService } from '../servicios/correo.service';
import { OtpRepository } from '../repositories/otp.repository';

@Injectable()
export class SolicitarOtpUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly correoService: CorreoService,
    private readonly otpRepository: OtpRepository,
  ) {}

  async execute(correo: string): Promise<{ mensaje: string }> {
    const usuario = await this.usuarioRepository.obtenerPorEmail(correo);

    if (!usuario) {
      throw new NotFoundException('No existe una cuenta registrada con ese correo electronico');
    }

    // Elimina OTPs previos del usuario antes de crear uno nuevo
    await this.otpRepository.invalidarOtpsDeUsuario(usuario.id);

    // Genera un codigo unico que no exista en BD
    const codigo = await this.generarCodigoUnico();
    const fechaExpiracion = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    await this.otpRepository.crear(usuario.id, codigo, fechaExpiracion);
    await this.correoService.enviarOtp(correo, codigo);

    return { mensaje: 'Se envio un codigo de verificacion a tu correo electronico' };
  }

  async verificarOtp(correo: string, codigo: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.obtenerPorEmail(correo);
    if (!usuario) return false;

    const otp = await this.otpRepository.buscarPorCodigoYUsuario(usuario.id, codigo);
    if (!otp) return false;

    if (new Date() > otp.fechaExpiracion) {
      await this.otpRepository.marcarComoUsado(otp.otpId);
      return false;
    }

    await this.otpRepository.marcarComoUsado(otp.otpId);
    return true;
  }

  private async generarCodigoUnico(): Promise<string> {
    let codigo: string;
    let intentos = 0;

    do {
      codigo = Math.floor(1000 + Math.random() * 9000).toString();
      const existe = await this.otpRepository.buscarPorCodigo(codigo);
      if (!existe) break;
      intentos++;
    } while (intentos < 5);

    return codigo;
  }
}
