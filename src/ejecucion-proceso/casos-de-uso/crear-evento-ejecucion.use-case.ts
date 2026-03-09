import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EstadoProcesoRepository } from '../../status-proceso/estado-proceso.repository';
import { ConfiguracionAlertaRepository } from '../../configuracion-alerta/configuracion-alerta.repository';
import { CrearEventoEjecucionDto } from '../dtos/crear-evento-ejecucion.dto';
import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import { ejecucionProcesoMapper } from '../mappers/ejecucion-proceso.mapper';
import { EjecucionProcesoEntity } from '../ejecucion-proceso.entity';

@Injectable()
export class CrearEventoEjecucionUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly estadoProcesoRepository: EstadoProcesoRepository,
    private readonly configuracionAlertaRepository: ConfiguracionAlertaRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: any): Promise<EjecucionProcesoResponse> {
    try {
      const { datos } = dto;
      const ejecucionProcesoId = datos.p_proceso_ejecucion_id;
      const estadoCodigo = datos.p_estado;

      const ejecucion = await this.ejecucionProcesoRepository.obtenerPorId(ejecucionProcesoId);
      if (!ejecucion) {
        throw new NotFoundException(`Ejecucion con ID ${ejecucionProcesoId} no encontrada`);
      }

      const estado = await this.estadoProcesoRepository.obtenerPorCodigo(estadoCodigo);
      if (!estado) {
        throw new NotFoundException(`Estado de proceso con codigo "${estadoCodigo}" no encontrado`);
      }

      const ahora = new Date();
      const duracionSegundos = Math.floor(
        (ahora.getTime() - ejecucion.fechaHoraInicio.getTime()) / 1000,
      );

      let registros: any = {};

      if (datos?.p_total_registros) {
        registros.numeroRegistrosProcesados = datos.p_total_registros;
      }

      if (datos?.p_registros_fallidos) {
        registros.numeroRegistrosFallidos = datos.p_registros_fallidos;
      }

      if (datos?.p_registros_exitosos) {
        registros.numeroRegistrosExitosos = datos.p_registros_exitosos;
      }

      const actualizada = await this.ejecucionProcesoRepository.actualizar(ejecucionProcesoId, {
        statusProcesoId: estado.id,
        fechaHoraFin: ahora,
        duracionSegundos,
        ...registros,
      });

      if (estadoCodigo === 'EXITOSO') {
        const alertas = await this.configuracionAlertaRepository.listarPorProcesoId(ejecucion.procesoId);
        const alertasaEnviar: any = alertas.find((alerta) => alerta.condicionDisparo === "status='EXITOSO'");
        const destinatarios = alertasaEnviar?.recipiente?.emailsDestino;
        const emails = this.obtenerDestinatarios(destinatarios);
        const templateMensaje = alertasaEnviar?.templateMensaje;
        console.log('[CrearEventoEjecucion] configuraciones de alerta del proceso:', emails, templateMensaje);

        if (emails.length > 0 && templateMensaje) {
          await Promise.all(
            emails.map((email) => this.enviarCorreoSes(email, 'Estado del proceso: EXITOSO', templateMensaje)),
          );
        }
      }

      return ejecucionProcesoMapper(actualizada);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al registrar el evento de ejecucion',
          errorMessage: error.response ?? error.message,
        },
        error.status || 500,
      );
    }
  }

  private async enviarCorreoSes(destinatario: string, asunto: string, html: string): Promise<void> {
    try {
      const cliente = new SESClient({
        region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
        credentials: {
          accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY', ''),
          secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY', ''),
        },
      });

      const comando = new SendEmailCommand({
        Source: this.configService.get<string>('SES_FROM_EMAIL'),
        Destination: {
          ToAddresses: [destinatario],
        },
        Message: {
          Subject: { Data: asunto, Charset: 'UTF-8' },
          Body: {
            Html: { Data: html, Charset: 'UTF-8' },
          },
        },
      });

      await cliente.send(comando);
      console.log(`[CrearEventoEjecucion] Correo enviado a: ${destinatario}`);
    } catch (error) {
      console.error(`[CrearEventoEjecucion] Error al enviar correo a ${destinatario}:`, error?.message ?? error);
    }
  }

  private obtenerDestinatarios(destinatarios: string): string[] {
    if (!destinatarios) return [];
    return destinatarios.split(',').map((email) => email.trim()).filter(Boolean);
  }
}
