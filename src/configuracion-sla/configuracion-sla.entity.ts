import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProcesoEntity } from '../proceso/proceso.entity';

@Entity('smr_configuracion_sla')
export class ConfiguracionSlaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'proceso_id', type: 'uuid' })
  procesoId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_id' })
  proceso: ProcesoEntity;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'tiempo_maximo_ejecucion_minutos', type: 'numeric', nullable: true })
  tiempoMaximoEjecucionMinutos: number;

  @Column({ name: 'hora_limite_finalizacion', type: 'timestamp', nullable: true })
  horaLimiteFinalizacion: Date;

  @Column({ name: 'porcentaje_registros_minimo', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeRegistrosMinimo: number;

  @Column({ name: 'umbral_error_porcentaje', type: 'numeric', precision: 5, scale: 2, nullable: true })
  umbralErrorPorcentaje: number;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
