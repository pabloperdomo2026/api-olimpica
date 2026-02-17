import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_agg_resumen_diario')
export class DmAggResumenDiarioEntity {
  @PrimaryColumn({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @PrimaryColumn({ name: 'proceso_key', type: 'numeric' })
  procesoKey: number;

  @Column({ name: 'total_ejecuciones', type: 'numeric', nullable: true })
  totalEjecuciones: number;

  @Column({ name: 'ejecuciones_exitosas', type: 'numeric', nullable: true })
  ejecucionesExitosas: number;

  @Column({ name: 'ejecuciones_fallidas', type: 'numeric', nullable: true })
  ejecucionesFallidas: number;

  @Column({ name: 'ejecuciones_con_warning', type: 'numeric', nullable: true })
  ejecucionesConWarning: number;

  @Column({ name: 'ejecuciones_con_reintento', type: 'numeric', nullable: true })
  ejecucionesConReintento: number;

  @Column({ name: 'total_registros_procesados', type: 'numeric', nullable: true })
  totalRegistrosProcesados: number;

  @Column({ name: 'total_registros_exitosos', type: 'numeric', nullable: true })
  totalRegistrosExitosos: number;

  @Column({ name: 'total_registros_fallidos', type: 'numeric', nullable: true })
  totalRegistrosFallidos: number;

  @Column({ name: 'porcentaje_exito_promedio', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeExitoPromedio: number;

  @Column({ name: 'duracion_promedio_minutos', type: 'numeric', precision: 10, scale: 2, nullable: true })
  duracionPromedioMinutos: number;

  @Column({ name: 'duracion_minima_minutos', type: 'numeric', precision: 10, scale: 2, nullable: true })
  duracionMinimaMinutos: number;

  @Column({ name: 'duracion_maxima_minutos', type: 'numeric', precision: 10, scale: 2, nullable: true })
  duracionMaximaMinutos: number;

  @Column({ name: 'duracion_total_minutos', type: 'numeric', precision: 10, scale: 2, nullable: true })
  duracionTotalMinutos: number;

  @Column({ name: 'throughput_promedio_rps', type: 'numeric', precision: 10, scale: 2, nullable: true })
  throughputPromedioRps: number;

  @Column({ name: 'porcentaje_calidad_promedio', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeCalidadPromedio: number;

  @Column({ name: 'total_rechazos_calidad', type: 'numeric', nullable: true })
  totalRechazosCalidad: number;

  @Column({ name: 'ejecuciones_cumplen_sla', type: 'numeric', nullable: true })
  ejecucionesCumplenSla: number;

  @Column({ name: 'ejecuciones_exceden_sla', type: 'numeric', nullable: true })
  ejecucionesExcedenSla: number;

  @Column({ name: 'porcentaje_cumplimiento_sla', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeCumplimientoSla: number;

  @Column({ name: 'costo_total_dia_usd', type: 'numeric', precision: 10, scale: 4, nullable: true })
  costoTotalDiaUsd: number;

  @Column({ name: 'fecha_actualizacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaActualizacion: Date;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
