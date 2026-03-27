import { Injectable, Logger } from '@nestjs/common';
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

  async enviarCorreo(destinatario: string, asunto: string, html: string): Promise<void> {
    const remitente = this.configService.get<string>('MAIL', '');
    this.logger.log(`Enviando correo — from: "${remitente}" to: "${destinatario}"`);

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

    this.logger.log(`Correo enviado a: ${destinatario}`);
  }
}
