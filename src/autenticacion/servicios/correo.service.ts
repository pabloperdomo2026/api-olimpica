import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class CorreoService {
  private readonly logger = new Logger(CorreoService.name);
  private readonly sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY', ''),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY', ''),
      },
    });
  }

  private async enviarSes(
    destinatario: string,
    remitente: string,
    asunto: string,
    html: string,
  ): Promise<void> {
    await this.sesClient.send(
      new SendEmailCommand({
        Source: `"Olimpica" <${remitente}>`,
        Destination: { ToAddresses: [destinatario] },
        Message: {
          Subject: { Data: asunto, Charset: 'UTF-8' },
          Body: {
            Html: { Data: html, Charset: 'UTF-8' },
          },
        },
      }),
    );
  }

  async enviarMensaje(destinatario: string, asunto: string, html: string): Promise<void> {
    const remitente = this.configService.get<string>('MAIL', '');

    try {
      await this.enviarSes(destinatario, remitente, asunto, html);
      this.logger.log(`Correo enviado a: ${destinatario} | Asunto: ${asunto}`);
    } catch (error) {
      console.log(error);
      this.logger.error(`Fallo al enviar correo a ${destinatario}: ${error?.message}`);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }

  async enviarOtp(destinatario: string, otp: string): Promise<void> {
    const remitente = this.configService.get<string>('MAIL', '');

    this.logger.log(`[1] Iniciando envio de OTP a: ${destinatario}`);

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

    try {
      this.logger.log('[2] Enviando via AWS SES...');
      await this.enviarSes(destinatario, remitente, 'Codigo de verificacion - Recuperar contrasena', html);
      this.logger.log(`[3] OTP enviado exitosamente a: ${destinatario}`);
    } catch (error) {
      this.logger.error(`[ERROR] Fallo al enviar OTP a ${destinatario}`);
      this.logger.error(`Mensaje: ${error?.message}`);
      console.log(error);
      throw new InternalServerErrorException('No se pudo enviar el correo de verificacion');
    }
  }
}
