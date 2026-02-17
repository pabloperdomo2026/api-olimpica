import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_fact_lote')
export class DmFactLoteEntity {
  @PrimaryColumn({ name: 'lote_id', type: 'numeric' })
  loteId: number;

  @Column({ name: 'ejecucion_id', type: 'numeric' })
  ejecucionId: number;

  @Column({ name: 'proceso_key', type: 'numeric' })
  procesoKey: number;

  @Column({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @Column({ name: 'tiempo_key', type: 'numeric' })
  tiempoKey: number;

  @Column({ name: 'status_key', type: 'numeric' })
  statusKey: number;

  @Column({ name: 'punto_venta_key', type: 'numeric', nullable: true })
  puntoVentaKey: number;

  @Column({ name: 'numero_lote', type: 'numeric' })
  numeroLote: number;

  @Column({ name: 'id_lote_externo', type: 'varchar', length: 100, nullable: true })
  idLoteExterno: string;

  @Column({ name: 'numero_registros_lote', type: 'numeric', nullable: true })
  numeroRegistrosLote: number;

  @Column({ name: 'numero_registros_exitosos', type: 'numeric', nullable: true })
  numeroRegistrosExitosos: number;

  @Column({ name: 'numero_registros_fallidos', type: 'numeric', nullable: true })
  numeroRegistrosFallidos: number;

  @Column({ name: 'porcentaje_exito_lote', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeExitoLote: number;

  @Column({ name: 'duracion_milisegundos', type: 'numeric', nullable: true })
  duracionMilisegundos: number;

  @Column({ name: 'lote_exitoso', type: 'smallint', nullable: true })
  loteExitoso: number;

  @Column({ name: 'lote_fallido', type: 'smallint', nullable: true })
  loteFallido: number;

  @Column({ name: 'requiere_reintento', type: 'smallint', nullable: true })
  requiereReintento: number;

  @Column({ name: 'numero_reintentos', type: 'numeric', default: 0 })
  numeroReintentos: number;

  @Column({ name: 'codigo_http', type: 'numeric', nullable: true })
  codigoHttp: number;

  @Column({ name: 'es_http_exitoso', type: 'smallint', nullable: true })
  esHttpExitoso: number;

  @Column({ name: 'fecha_carga_dm', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCargaDm: Date;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
