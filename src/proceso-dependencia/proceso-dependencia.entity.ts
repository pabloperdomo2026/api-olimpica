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

@Entity('smr_proceso_dependencia')
export class ProcesoDependenciaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'proceso_id', type: 'uuid' })
  procesoId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_id' })
  proceso: ProcesoEntity;

  @Column({ name: 'proceso_depende_id', type: 'uuid' })
  procesoDependeId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_depende_id' })
  procesoDepende: ProcesoEntity;

  @Column({ name: 'secuencia_dependencia', type: 'integer', nullable: true })
  secuenciaDependencia: number;

  @Column({ name: 'tipo_dependencia', type: 'varchar', length: 50, nullable: true })
  tipoDependencia: string;

  @Column({ name: 'es_obligatoria', type: 'boolean', default: true })
  esObligatoria: boolean;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  descripcion: string;

  @Column({ name: 'parametros_gestion', type: 'text', nullable: true })
  parametrosGestion: string;

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
