import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_fact_error')
export class DmFactErrorEntity {
  @PrimaryColumn({ name: 'error_id', type: 'numeric' })
  errorId: number;

  @Column({ name: 'ejecucion_id', type: 'numeric' })
  ejecucionId: number;

  @Column({ name: 'proceso_key', type: 'numeric' })
  procesoKey: number;

  @Column({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @Column({ name: 'tiempo_key', type: 'numeric' })
  tiempoKey: number;

  @Column({ name: 'tipo_error_key', type: 'numeric' })
  tipoErrorKey: number;

  @Column({ name: 'status_key', type: 'numeric' })
  statusKey: number;

  @Column({ name: 'punto_venta_key', type: 'numeric', nullable: true })
  puntoVentaKey: number;

  @Column({ name: 'numero_errores', type: 'numeric', default: 1 })
  numeroErrores: number;

  @Column({ name: 'numero_registros_afectados', type: 'numeric', nullable: true })
  numeroRegistrosAfectados: number;

  @Column({ name: 'numero_lotes_afectados', type: 'numeric', nullable: true })
  numeroLotesAfectados: number;

  @Column({ name: 'codigo_error', type: 'varchar', length: 50, nullable: true })
  codigoError: string;

  @Column({ name: 'categoria_error', type: 'varchar', length: 100, nullable: true })
  categoriaError: string;

  @Column({ name: 'severidad_error', type: 'numeric', nullable: true })
  severidadError: number;

  @Column({ name: 'es_error_critico', type: 'smallint', nullable: true })
  esErrorCritico: number;

  @Column({ name: 'es_error_recuperable', type: 'smallint', nullable: true })
  esErrorRecuperable: number;

  @Column({ name: 'fue_resuelto', type: 'boolean', default: false })
  fueResuelto: boolean;

  @Column({ name: 'fue_reintentado', type: 'boolean', default: false })
  fueReintentado: boolean;

  @Column({ name: 'numero_reintentos', type: 'numeric', default: 0 })
  numeroReintentos: number;

  @Column({ name: 'tiempo_resolucion_minutos', type: 'numeric', nullable: true })
  tiempoResolucionMinutos: number;

  @Column({ name: 'fecha_carga_dm', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCargaDm: Date;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
