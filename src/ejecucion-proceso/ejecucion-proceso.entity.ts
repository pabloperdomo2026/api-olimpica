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
import { ProcesoEntity } from '../proceso/proceso.entity';
import { StatusProcesoEntity } from '../status-proceso/status-proceso.entity';

@Entity('smr_ejecucion_proceso')
export class EjecucionProcesoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @Column({ name: 'proceso_id', type: 'uuid' })
  procesoId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_id' })
  proceso: ProcesoEntity;

  @Column({ name: 'status_proceso_id', type: 'uuid' })
  statusProcesoId: string;

  @ManyToOne(() => StatusProcesoEntity)
  @JoinColumn({ name: 'status_proceso_id' })
  statusProceso: StatusProcesoEntity;

  @Column({ name: 'fecha_ejecucion', type: 'date' })
  fechaEjecucion: Date;

  @Column({ name: 'fecha_hora_inicio', type: 'timestamp' })
  fechaHoraInicio: Date;

  @Column({ name: 'fecha_hora_fin', type: 'timestamp', nullable: true })
  fechaHoraFin: Date;

  @Column({ name: 'tipo_ejecucion', type: 'varchar', length: 50, nullable: true })
  tipoEjecucion: string;

  @Column({ name: 'numero_registros_procesados', type: 'numeric', nullable: true })
  numeroRegistrosProcesados: number;

  @Column({ name: 'numero_registros_exitosos', type: 'numeric', nullable: true })
  numeroRegistrosExitosos: number;

  @Column({ name: 'numero_registros_fallidos', type: 'numeric', nullable: true })
  numeroRegistrosFallidos: number;

  @Column({ name: 'duracion_segundos', type: 'numeric', nullable: true })
  duracionSegundos: number;

  @Column({ name: 'usuario_solicita', type: 'varchar', length: 100, nullable: true })
  usuarioSolicita: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
