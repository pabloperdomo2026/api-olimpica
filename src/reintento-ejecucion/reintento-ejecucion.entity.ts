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
import { EjecucionLoteEntity } from '../ejecucion-lote/ejecucion-lote.entity';
import { EstadoProcesoEntity } from '../status-proceso/estado-proceso.entity';

@Entity('smr_reintento_ejecucion')
export class ReintentoEjecucionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ejecucion_proceso_id', type: 'uuid' })
  ejecucionProcesoId: string;

  @ManyToOne(() => EjecucionProcesoEntity)
  @JoinColumn({ name: 'ejecucion_proceso_id' })
  ejecucionProceso: EjecucionProcesoEntity;

  @Column({ name: 'ejecucion_lote_id', type: 'uuid', nullable: true })
  ejecucionLoteId: string;

  @ManyToOne(() => EjecucionLoteEntity)
  @JoinColumn({ name: 'ejecucion_lote_id' })
  ejecucionLote: EjecucionLoteEntity;

  @Column({ name: 'fecha_ejecucion', type: 'date' })
  fechaEjecucion: Date;

  @Column({ name: 'numero_reintento', type: 'numeric' })
  numeroReintento: number;

  @Column({ name: 'fecha_hora_reintento', type: 'timestamp' })
  fechaHoraReintento: Date;

  @Column({ name: 'status_proceso_id', type: 'uuid' })
  statusProcesoId: string;

  @ManyToOne(() => EstadoProcesoEntity)
  @JoinColumn({ name: 'status_proceso_id' })
  statusProceso: EstadoProcesoEntity;

  @Column({ name: 'razon_reintento', type: 'varchar', length: 2000, nullable: true })
  razonReintento: string;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  resultado: string;

  @Column({ name: 'usuario_aprueba', type: 'varchar', length: 100, nullable: true })
  usuarioAprueba: string;

  @Column({ name: 'fecha_aprobacion', type: 'timestamp', nullable: true })
  fechaAprobacion: Date;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
