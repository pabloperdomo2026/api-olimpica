import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class CorreoService {
  private readonly logger = new Logger(CorreoService.name);

  constructor(private readonly configService: ConfigService) {}

  private async obtenerTokenAcceso(): Promise<string> {
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('CLIENT_ID'),
      this.configService.get<string>('CLIENT_SECRET'),
      this.configService.get<string>('REDIRECT_URI'),
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get<string>('REFRESH_TOKEN'),
    });

    const { token } = await oauth2Client.getAccessToken();

    if (!token) throw new Error('No se pudo obtener el token de acceso de Google');

    return token;
  }

  private construirMensajeRaw(
    destinatario: string,
    remitente: string,
    asunto: string,
    html: string,
  ): string {
    const lineas = [
      `From: "Olimpica" <${remitente}>`,
      `To: ${destinatario}`,
      `Subject: ${asunto}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      html,
    ];
    return Buffer.from(lineas.join('\r\n')).toString('base64url');
  }

  async enviarMensaje(destinatario: string, asunto: string, html: string): Promise<void> {
    const remitente = this.configService.get<string>('MAIL', '');

    try {
      const tokenAcceso = await this.obtenerTokenAcceso();

      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: tokenAcceso });

      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

      const raw = this.construirMensajeRaw(destinatario, remitente, asunto, html);

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw },
      });

      this.logger.log(`Correo enviado a: ${destinatario} | Asunto: ${asunto}`);
    } catch (error) {
      this.logger.error(`Fallo al enviar correo a ${destinatario}: ${error?.message}`);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }

  async enviarOtp(destinatario: string, otp: string): Promise<void> {
    const remitente = this.configService.get<string>('MAIL', '');

    this.logger.log(`[1] Iniciando envio de OTP a: ${destinatario}`);

    try {
      this.logger.log('[2] Obteniendo token de acceso de Google...');
      const tokenAcceso = await this.obtenerTokenAcceso();
      this.logger.log('[3] Token obtenido. Enviando via Gmail API...');

      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: tokenAcceso });

      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

      const html = `
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
      `;

      const raw = this.construirMensajeRaw(
        destinatario,
        remitente,
        'Codigo de verificacion - Recuperar contrasena',
        html,
      );

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw },
      });

      this.logger.log(`[4] OTP enviado exitosamente a: ${destinatario}`);
    } catch (error) {
      this.logger.error(`[ERROR] Fallo al enviar OTP a ${destinatario}`);
      this.logger.error(`Mensaje: ${error?.message}`);
      this.logger.error(`Codigo: ${error?.code} | Status: ${error?.status}`);
      throw new InternalServerErrorException('No se pudo enviar el correo de verificacion');
    }
  }
}
