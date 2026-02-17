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
import { MensajeErrorEntity } from '../mensaje-error/mensaje-error.entity';

@Entity('smr_incidencia_error')
export class IncidenciaErrorEntity {
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

  @Column({ name: 'mensaje_error_id', type: 'uuid', nullable: true })
  mensajeErrorId: string;

  @ManyToOne(() => MensajeErrorEntity)
  @JoinColumn({ name: 'mensaje_error_id' })
  mensajeError: MensajeErrorEntity;

  @Column({ name: 'fecha_hora_error', type: 'timestamp' })
  fechaHoraError: Date;

  @Column({ name: 'mensaje_error_texto', type: 'varchar', length: 4000, nullable: true })
  mensajeErrorTexto: string;

  @Column({ name: 'stack_trace', type: 'text', nullable: true })
  stackTrace: string;

  @Column({ name: 'datos_contexto', type: 'text', nullable: true })
  datosContexto: string;

  @Column({ name: 'num_ocurrencias', type: 'numeric', default: 1 })
  numOcurrencias: number;

  @Column({ name: 'fue_resuelto', type: 'boolean', default: false })
  fueResuelto: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
