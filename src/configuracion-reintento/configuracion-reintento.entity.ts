import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProcesoEntity } from '../proceso/proceso.entity';

@Entity('smr_configuracion_reintento')
export class ConfiguracionReintentoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'proceso_id', type: 'uuid' })
  procesoId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_id' })
  proceso: ProcesoEntity;

  @Column({ name: 'numero_reintentos_max', type: 'numeric', default: 3 })
  numeroReintentosMax: number;

  @Column({ name: 'intervalo_inicial_segundos', type: 'numeric', default: 60, nullable: true })
  intervaloInicialSegundos: number;

  @Column({ name: 'factor_backoff', type: 'numeric', precision: 5, scale: 2, default: 2.0, nullable: true })
  factorBackoff: number;

  @Column({ name: 'intervalo_maximo_segundos', type: 'numeric', default: 3600, nullable: true })
  intervaloMaximoSegundos: number;

  @Column({ name: 'reintentar_en_errores', type: 'varchar', length: 500 })
  reintentarEnErrores: string;

  @Column({ name: 'no_reintentar_en_errores', type: 'varchar', length: 500, nullable: true })
  noReintentarEnErrores: string;

  @Column({ name: 'requiere_aprobacion_manual', type: 'boolean', default: false })
  requiereAprobacionManual: boolean;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;
}
