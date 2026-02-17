import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoAlertaEntity } from '../tipo-alerta/tipo-alerta.entity';
import { ProcesoEntity } from '../proceso/proceso.entity';
import { RecipienteCorreoEntity } from '../recipiente-correo/recipiente-correo.entity';

@Entity('smr_configuracion_alerta')
export class ConfiguracionAlertaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tipo_alerta_id', type: 'uuid' })
  tipoAlertaId: string;

  @ManyToOne(() => TipoAlertaEntity)
  @JoinColumn({ name: 'tipo_alerta_id' })
  tipoAlerta: TipoAlertaEntity;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'condicion_disparo', type: 'varchar', length: 4000, nullable: true })
  condicionDisparo: string;

  @Column({ name: 'tiempo_evaluacion', type: 'integer', nullable: true })
  tiempoEvaluacion: number;

  @Column({ name: 'umbral_valor', type: 'varchar', length: 100, nullable: true })
  umbralValor: string;

  @Column({ name: 'template_mensaje', type: 'varchar', length: 4000 })
  templateMensaje: string;

  @Column({ name: 'recipiente_id', type: 'uuid' })
  recipienteId: string;

  @ManyToOne(() => RecipienteCorreoEntity)
  @JoinColumn({ name: 'recipiente_id' })
  recipiente: RecipienteCorreoEntity;

  @Column({ name: 'proceso_id', type: 'uuid' })
  procesoId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_id' })
  proceso: ProcesoEntity;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;
}
