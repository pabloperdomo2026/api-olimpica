import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CorreoService {
  private readonly logger = new Logger(CorreoService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('MAIL'),
        clientId: this.configService.get<string>('CLIENT_ID'),
        clientSecret: this.configService.get<string>('CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('REFRESH_TOKEN'),
      },
    } as nodemailer.TransportOptions);
  }

  async enviarOtp(destinatario: string, otp: string): Promise<void> {
    const remitente = this.configService.get<string>('MAIL');

    try {
      await this.transporter.sendMail({
        from: `"Olimpica" <${remitente}>`,
        to: destinatario,
        subject: 'Codigo de verificacion - Recuperar contrasena',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1a56db; margin-bottom: 8px;">Recuperar contrasena</h2>
            <p style="color: #374151;">Recibimos una solicitud para restablecer la contrasena de tu cuenta.</p>
            <p style="color: #374151;">Tu codigo de verificacion es:</p>
            <div style="background-color: #eff6ff; border: 2px solid #bfdbfe; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <span style="font-size: 40px; font-weight: bold; letter-spacing: 12px; color: #1d4ed8;">${otp}</span>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Este codigo expira en <strong>10 minutos</strong>.</p>
            <p style="color: #6b7280; font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="color: #9ca3af; font-size: 12px;">Olimpica &mdash; Sistema de Monitoreo</p>
          </div>
        `,
      });

      this.logger.log(`OTP enviado a: ${destinatario}`);
    } catch (error) {
      this.logger.error(`Error al enviar OTP a ${destinatario}:`, error);
      throw new InternalServerErrorException('No se pudo enviar el correo de verificacion');
    }
  }
}
