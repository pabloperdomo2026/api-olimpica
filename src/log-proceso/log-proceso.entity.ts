import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';
import { EjecucionProcesoEntity } from '../ejecucion-proceso/ejecucion-proceso.entity';

@Entity('smr_log_proceso')
export class LogProcesoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @Column({ name: 'ejecucion_proceso_id', type: 'uuid', nullable: true })
  ejecucionProcesoId: string;

  @ManyToOne(() => EjecucionProcesoEntity)
  @JoinColumn({ name: 'ejecucion_proceso_id' })
  ejecucionProceso: EjecucionProcesoEntity;

  @Column({ name: 'tipo_log_id', type: 'numeric' })
  tipoLogId: number;

  @Column({ name: 'fecha_hora_log', type: 'timestamp' })
  fechaHoraLog: Date;

  @Column({ type: 'text', nullable: true })
  mensaje: string;

  @Column({ name: 'stack_trace', type: 'text', nullable: true })
  stackTrace: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
