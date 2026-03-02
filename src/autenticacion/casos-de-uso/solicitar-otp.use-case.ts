import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../../usuario/usuario.repository';
import { CorreoService } from '../servicios/correo.service';

interface DatosOtp {
  otp: string;
  expiracion: Date;
}

@Injectable()
export class SolicitarOtpUseCase {
  private readonly otps = new Map<string, DatosOtp>();

  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly correoService: CorreoService,
  ) {}

  async execute(correo: string): Promise<{ mensaje: string }> {
    const usuario = await this.usuarioRepository.obtenerPorEmail(correo);

    if (!usuario) {
      throw new NotFoundException('No existe una cuenta registrada con ese correo electronico');
    }

    const otp = this.generarOtp();
    const expiracion = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    this.otps.set(correo, { otp, expiracion });

    await this.correoService.enviarOtp(correo, otp);

    return { mensaje: 'Se envio un codigo de verificacion a tu correo electronico' };
  }

  verificarOtp(correo: string, otp: string): boolean {
    const datos = this.otps.get(correo);

    if (!datos) return false;

    if (new Date() > datos.expiracion) {
      this.otps.delete(correo);
      return false;
    }

    const valido = datos.otp === otp;
    if (valido) this.otps.delete(correo);

    return valido;
  }

  private generarOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
