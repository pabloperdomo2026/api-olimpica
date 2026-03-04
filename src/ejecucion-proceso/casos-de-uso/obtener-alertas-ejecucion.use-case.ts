import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertaEnviadaEntity } from '../../alerta-enviada/alerta-enviada.entity';

export interface AlertaEjecucionResponse {
  id: string;
  nombreAlerta: string;
  tipoAlerta?: string;
  destinatarios?: string;
  fueEnviada: boolean;
  fechaHoraEnvio: Date;
}

@Injectable()
export class ObtenerAlertasEjecucionUseCase {
  constructor(
    @InjectRepository(AlertaEnviadaEntity)
    private readonly alertaRepo: Repository<AlertaEnviadaEntity>,
  ) {}

  async execute(ejecucionId: string): Promise<AlertaEjecucionResponse[]> {
    const alertas = await this.alertaRepo.find({
      where: { ejecucionProcesoId: ejecucionId },
      relations: ['configuracionAlerta', 'configuracionAlerta.tipoAlerta'],
      order: { fechaHoraEnvio: 'DESC' },
    });

    return alertas.map((a) => ({
      id: a.id,
      nombreAlerta: a.configuracionAlerta?.nombre ?? '—',
      tipoAlerta: a.configuracionAlerta?.tipoAlerta?.nombre ?? undefined,
      destinatarios: a.destinatarios ?? undefined,
      fueEnviada: a.fueEnviada ?? false,
      fechaHoraEnvio: a.fechaHoraEnvio,
    }));
  }
}
