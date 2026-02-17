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
import { TipoProgramacionEntity } from '../tipo-programacion/tipo-programacion.entity';

@Entity('smr_programacion')
export class ProgramacionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'proceso_id', type: 'uuid' })
  procesoId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_id' })
  proceso: ProcesoEntity;

  @Column({ name: 'tipo_programacion_id', type: 'uuid' })
  tipoProgramacionId: string;

  @ManyToOne(() => TipoProgramacionEntity)
  @JoinColumn({ name: 'tipo_programacion_id' })
  tipoProgramacion: TipoProgramacionEntity;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'expresion_cron', type: 'varchar', length: 100, nullable: true })
  expresionCron: string;

  @Column({ name: 'frecuencia_minutos', type: 'numeric', nullable: true })
  frecuenciaMinutos: number;

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
