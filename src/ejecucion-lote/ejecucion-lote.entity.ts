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
import { EjecucionPasoEntity } from '../ejecucion-paso/ejecucion-paso.entity';
import { EstadoProcesoEntity } from '../status-proceso/estado-proceso.entity';

@Entity('smr_ejecucion_lote')
export class EjecucionLoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @Column({ name: 'ejecucion_proceso_id', type: 'uuid' })
  ejecucionProcesoId: string;

  @ManyToOne(() => EjecucionProcesoEntity)
  @JoinColumn({ name: 'ejecucion_proceso_id' })
  ejecucionProceso: EjecucionProcesoEntity;

  @Column({ name: 'ejecucion_paso_id', type: 'uuid', nullable: true })
  ejecucionPasoId: string;

  @ManyToOne(() => EjecucionPasoEntity)
  @JoinColumn({ name: 'ejecucion_paso_id' })
  ejecucionPaso: EjecucionPasoEntity;

  @Column({ name: 'status_proceso_id', type: 'uuid' })
  statusProcesoId: string;

  @ManyToOne(() => EstadoProcesoEntity)
  @JoinColumn({ name: 'status_proceso_id' })
  statusProceso: EstadoProcesoEntity;

  @Column({ name: 'status_http_id', type: 'numeric', nullable: true })
  statusHttpId: number;

  @Column({ name: 'fecha_ejecucion', type: 'date' })
  fechaEjecucion: Date;

  @Column({ name: 'fecha_hora_inicio', type: 'timestamp' })
  fechaHoraInicio: Date;

  @Column({ name: 'fecha_hora_fin', type: 'timestamp', nullable: true })
  fechaHoraFin: Date;

  @Column({ name: 'lote_id', type: 'varchar', length: 100 })
  loteId: string;

  @Column({ name: 'numero_lote', type: 'numeric' })
  numeroLote: number;

  @Column({ name: 'numero_registros_lote', type: 'numeric' })
  numeroRegistrosLote: number;

  @Column({ name: 'numero_registros_exitosos', type: 'numeric', default: 0 })
  numeroRegistrosExitosos: number;

  @Column({ name: 'numero_registros_fallidos', type: 'numeric', default: 0 })
  numeroRegistrosFallidos: number;

  @Column({ name: 'codigo_http', type: 'numeric', nullable: true })
  codigoHttp: number;

  @Column({ name: 'mensaje_respuesta', type: 'varchar', length: 2000, nullable: true })
  mensajeRespuesta: string;

  @Column({ name: 'numero_reintentos', type: 'numeric', default: 0 })
  numeroReintentos: number;

  @Column({ name: 'duracion_milisegundos', type: 'numeric', nullable: true })
  duracionMilisegundos: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;
}
