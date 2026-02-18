import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EjecucionProcesoEntity } from '../ejecucion-proceso/ejecucion-proceso.entity';
import { EstadoProcesoEntity } from '../status-proceso/estado-proceso.entity';

@Entity('smr_ejecucion_paso')
export class EjecucionPasoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ejecucion_proceso_id', type: 'uuid' })
  ejecucionProcesoId: string;

  @ManyToOne(() => EjecucionProcesoEntity)
  @JoinColumn({ name: 'ejecucion_proceso_id' })
  ejecucionProceso: EjecucionProcesoEntity;

  @Column({ name: 'proceso_paso_id', type: 'uuid' })
  procesoPasoId: string;

  @Column({ name: 'status_proceso_id', type: 'uuid' })
  statusProcesoId: string;

  @ManyToOne(() => EstadoProcesoEntity)
  @JoinColumn({ name: 'status_proceso_id' })
  statusProceso: EstadoProcesoEntity;

  @Column({ name: 'fecha_hora_inicio', type: 'timestamp' })
  fechaHoraInicio: Date;

  @Column({ name: 'fecha_hora_fin', type: 'timestamp', nullable: true })
  fechaHoraFin: Date;

  @Column({ name: 'duracion_segundos', type: 'numeric', nullable: true })
  duracionSegundos: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
