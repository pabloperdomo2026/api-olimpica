import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_fact_sla')
export class DmFactSlaEntity {
  @PrimaryColumn({ name: 'sla_id', type: 'numeric' })
  slaId: number;

  @Column({ name: 'ejecucion_id', type: 'numeric' })
  ejecucionId: number;

  @Column({ name: 'proceso_key', type: 'numeric' })
  procesoKey: number;

  @Column({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @Column({ name: 'tiempo_maximo_permitido_minutos', type: 'numeric', nullable: true })
  tiempoMaximoPermitidoMinutos: number;

  @Column({ name: 'tiempo_real_ejecucion_minutos', type: 'numeric', precision: 10, scale: 2, nullable: true })
  tiempoRealEjecucionMinutos: number;

  @Column({ name: 'diferencia_sla_minutos', type: 'numeric', nullable: true })
  diferenciaSlaminutos: number;

  @Column({ name: 'porcentaje_uso_sla', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeUsoSla: number;

  @Column({ name: 'umbral_calidad_minimo', type: 'numeric', precision: 5, scale: 2, nullable: true })
  umbralCalidadMinimo: number;

  @Column({ name: 'porcentaje_calidad_real', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeCalidadReal: number;

  @Column({ name: 'umbral_error_maximo', type: 'numeric', precision: 5, scale: 2, nullable: true })
  umbralErrorMaximo: number;

  @Column({ name: 'porcentaje_error_real', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeErrorReal: number;

  @Column({ name: 'cumple_sla_tiempo', type: 'smallint', nullable: true })
  cumpleSlaTiempo: number;

  @Column({ name: 'cumple_sla_calidad', type: 'smallint', nullable: true })
  cumpleSlaCalidad: number;

  @Column({ name: 'cumple_sla_errores', type: 'smallint', nullable: true })
  cumpleSlaErrores: number;

  @Column({ name: 'cumple_sla_general', type: 'smallint', nullable: true })
  cumpleSlaGeneral: number;

  @Column({ name: 'excede_sla_por_minutos', type: 'numeric', nullable: true })
  excedeSlaPorMinutos: number;

  @Column({ name: 'fecha_carga_dm', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCargaDm: Date;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
