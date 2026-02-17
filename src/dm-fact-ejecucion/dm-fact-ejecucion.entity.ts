import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_fact_ejecucion')
export class DmFactEjecucionEntity {
  @PrimaryColumn({ name: 'ejecucion_id', type: 'numeric' })
  ejecucionId: number;

  @Column({ name: 'proceso_key', type: 'numeric' })
  procesoKey: number;

  @Column({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @Column({ name: 'tiempo_key', type: 'numeric' })
  tiempoKey: number;

  @Column({ name: 'tiempo_fin_key', type: 'numeric', nullable: true })
  tiempoFinKey: number;

  @Column({ name: 'status_key', type: 'numeric' })
  statusKey: number;

  @Column({ name: 'usuario_key', type: 'numeric', nullable: true })
  usuarioKey: number;

  @Column({ name: 'fuente_key', type: 'numeric', nullable: true })
  fuenteKey: number;

  @Column({ name: 'destino_key', type: 'numeric', nullable: true })
  destinoKey: number;

  @Column({ name: 'punto_venta_key', type: 'numeric', nullable: true })
  puntoVentaKey: number;

  @Column({ name: 'numero_registros_origen', type: 'numeric', nullable: true })
  numeroRegistrosOrigen: number;

  @Column({ name: 'numero_registros_procesados', type: 'numeric', nullable: true })
  numeroRegistrosProcesados: number;

  @Column({ name: 'numero_registros_exitosos', type: 'numeric', nullable: true })
  numeroRegistrosExitosos: number;

  @Column({ name: 'numero_registros_fallidos', type: 'numeric', nullable: true })
  numeroRegistrosFallidos: number;

  @Column({ name: 'numero_registros_rechazados', type: 'numeric', nullable: true })
  numeroRegistrosRechazados: number;

  @Column({ name: 'numero_lotes_total', type: 'numeric', nullable: true })
  numeroLotesTotal: number;

  @Column({ name: 'numero_lotes_exitosos', type: 'numeric', nullable: true })
  numeroLotesExitosos: number;

  @Column({ name: 'numero_lotes_fallidos', type: 'numeric', nullable: true })
  numeroLotesFallidos: number;

  @Column({ name: 'porcentaje_exito', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeExito: number;

  @Column({ name: 'duracion_segundos', type: 'numeric', nullable: true })
  duracionSegundos: number;

  @Column({ name: 'duracion_minutos', type: 'numeric', precision: 10, scale: 2, nullable: true })
  duracionMinutos: number;

  @Column({ name: 'duracion_horas', type: 'numeric', precision: 10, scale: 4, nullable: true })
  duracionHoras: number;

  @Column({ name: 'tiempo_promedio_por_registro_ms', type: 'numeric', precision: 10, scale: 4, nullable: true })
  tiempoPromedioPorRegistroMs: number;

  @Column({ name: 'throughput_registros_por_segundo', type: 'numeric', precision: 10, scale: 2, nullable: true })
  throughputRegistrosPorSegundo: number;

  @Column({ name: 'throughput_mb_por_segundo', type: 'numeric', precision: 10, scale: 2, nullable: true })
  throughputMbPorSegundo: number;

  @Column({ name: 'tamano_datos_procesados_mb', type: 'numeric', precision: 18, scale: 2, nullable: true })
  tamanoDatosProcesadosMb: number;

  @Column({ name: 'indicador_exito', type: 'smallint', nullable: true })
  indicadorExito: number;

  @Column({ name: 'indicador_error', type: 'smallint', nullable: true })
  indicadorError: number;

  @Column({ name: 'indicador_warning', type: 'smallint', nullable: true })
  indicadorWarning: number;

  @Column({ name: 'excede_sla', type: 'smallint', nullable: true })
  excedeSla: number;

  @Column({ name: 'requiere_reintento', type: 'smallint', nullable: true })
  requiereReintento: number;

  @Column({ name: 'tiene_rechazos_calidad', type: 'smallint', nullable: true })
  tieneRechazosCalidad: number;

  @Column({ name: 'numero_reintentos', type: 'numeric', default: 0 })
  numeroReintentos: number;

  @Column({ name: 'numero_alertas_enviadas', type: 'numeric', default: 0 })
  numeroAlertasEnviadas: number;

  @Column({ name: 'numero_errores', type: 'numeric', default: 0 })
  numeroErrores: number;

  @Column({ name: 'numero_warnings', type: 'numeric', default: 0 })
  numeroWarnings: number;

  @Column({ name: 'costo_estimado_usd', type: 'numeric', precision: 10, scale: 4, nullable: true })
  costoEstimadoUsd: number;

  @Column({ name: 'tipo_ejecucion', type: 'varchar', length: 50, nullable: true })
  tipoEjecucion: string;

  @Column({ name: 'fecha_carga_dm', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCargaDm: Date;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
