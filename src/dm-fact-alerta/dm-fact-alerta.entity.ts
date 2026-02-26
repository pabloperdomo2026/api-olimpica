import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_fact_alerta')
export class DmFactAlertaEntity {
  @PrimaryColumn({ name: 'alerta_id', type: 'numeric' })
  alertaId: number;

  @Column({ name: 'ejecucion_id', type: 'numeric', nullable: true })
  ejecucionId: number;

  @Column({ name: 'proceso_key', type: 'numeric', nullable: true })
  procesoKey: number;

  @Column({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @Column({ name: 'tiempo_key', type: 'numeric' })
  tiempoKey: number;

  @Column({ name: 'tipo_error_key', type: 'numeric', nullable: true })
  tipoErrorKey: number;

  @Column({ name: 'usuario_key', type: 'numeric', nullable: true })
  usuarioKey: number;

  @Column({ name: 'tipo_alerta', type: 'varchar', length: 50, nullable: true })
  tipoAlerta: string;

  @Column({ name: 'categoria_alerta', type: 'varchar', length: 50, nullable: true })
  categoriaAlerta: string;

  @Column({ name: 'nivel_prioridad', type: 'numeric', nullable: true })
  nivelPrioridad: number;

  @Column({ type: 'numeric', nullable: true })
  severidad: number;

  @Column({ name: 'numero_alertas', type: 'numeric', default: 1 })
  numeroAlertas: number;

  @Column({ name: 'fue_enviada', type: 'boolean', default: false })
  fueEnviada: boolean;

  @Column({ name: 'fue_confirmada', type: 'boolean', default: false })
  fueConfirmada: boolean;

  @Column({ name: 'requiere_accion_inmediata', type: 'boolean', default: false })
  requiereAccionInmediata: boolean;

  @Column({ name: 'tiempo_respuesta_minutos', type: 'numeric', nullable: true })
  tiempoRespuestaMinutos: number;

  @Column({ name: 'fecha_carga_dm', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCargaDm: Date;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
