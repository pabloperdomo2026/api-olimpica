import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertaEnviadaEntity } from '../../alerta-enviada/alerta-enviada.entity';

// export interface CrearNotificacionDto {
//   ejecucionProcesoId: string;
//   configuracionAlertaId: string;
//   organizacionId: string;
//   destinatarios?: string;
//   fueEnviada?: boolean;
// }

@Injectable()
export class CrearNotificacionUseCase {
  constructor(
    @InjectRepository(AlertaEnviadaEntity)
    private readonly alertaRepo: Repository<AlertaEnviadaEntity>,
  ) {}

  async execute(dto: any): Promise<any> {
    try {
      console.log('[CrearNotificacion] payload recibido:', dto);

    //   const notificacion = this.alertaRepo.create({
    //     ejecucionProcesoId: dto.ejecucionProcesoId,
    //     configuracionAlertaId: dto.configuracionAlertaId,
    //     organizacionId: dto.organizacionId,
    //     destinatarios: dto.destinatarios ?? undefined,
    //     fueEnviada: dto.fueEnviada ?? false,
    //     fechaHoraEnvio: new Date(),
    //   });

    //   const guardada = await this.alertaRepo.save(notificacion);

    //   console.log('[CrearNotificacion] notificacion guardada:', JSON.stringify(guardada, null, 2));

      return {
        mensaje: 'Notificacion creada correctamente',
      };
    } catch (error) {
      console.error('[CrearNotificacion] error:', error.message);
      throw new HttpException(
        {
          description: 'Error al crear la notificacion',
          errorMessage: error.message,
        },
        error.status || 500,
      );
    }
  }
}
