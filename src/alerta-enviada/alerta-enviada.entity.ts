import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';
import { ConfiguracionAlertaEntity } from '../configuracion-alerta/configuracion-alerta.entity';
import { EjecucionProcesoEntity } from '../ejecucion-proceso/ejecucion-proceso.entity';

@Entity('smr_alerta_enviada')
export class AlertaEnviadaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @Column({ name: 'configuracion_alerta_id', type: 'uuid' })
  configuracionAlertaId: string;

  @ManyToOne(() => ConfiguracionAlertaEntity)
  @JoinColumn({ name: 'configuracion_alerta_id' })
  configuracionAlerta: ConfiguracionAlertaEntity;

  @Column({ name: 'ejecucion_proceso_id', type: 'uuid', nullable: true })
  ejecucionProcesoId: string;

  @ManyToOne(() => EjecucionProcesoEntity)
  @JoinColumn({ name: 'ejecucion_proceso_id' })
  ejecucionProceso: EjecucionProcesoEntity;

  @Column({ name: 'fecha_hora_envio', type: 'timestamp' })
  fechaHoraEnvio: Date;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  destinatarios: string;

  @Column({ name: 'fue_enviada', type: 'boolean', nullable: true })
  fueEnviada: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;
}
