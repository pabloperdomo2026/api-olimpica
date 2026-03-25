import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class CorreoService {
  private readonly logger = new Logger(CorreoService.name);

  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY', ''));
  }

  async enviarCorreo(destinatario: string, asunto: string, html: string): Promise<void> {
    const remitente = this.configService.get<string>('SENDGRID_FROM_EMAIL', '');
    this.logger.log(`Enviando correo — from: "${remitente}" to: "${destinatario}"`);

    await sgMail.send({
      to: destinatario,
      from: remitente,
      subject: asunto,
      html,
    });

    this.logger.log(`Correo enviado a: ${destinatario}`);
  }
}
