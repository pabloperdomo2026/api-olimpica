import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_proceso')
export class DmDimProcesoEntity {
  @PrimaryColumn({ name: 'proceso_key', type: 'numeric' })
  procesoKey: number;

  @Column({ name: 'proceso_id', type: 'numeric' })
  procesoId: number;

  @Column({ name: 'codigo_proceso', type: 'varchar', length: 50, nullable: true })
  codigoProceso: string;

  @Column({ name: 'nombre_proceso', type: 'varchar', length: 200, nullable: true })
  nombreProceso: string;

  @Column({ name: 'tipo_proceso', type: 'varchar', length: 50, nullable: true })
  tipoProceso: string;

  @Column({ name: 'categoria_proceso', type: 'varchar', length: 50, nullable: true })
  categoriaProceso: string;

  @Column({ name: 'nivel_criticidad', type: 'varchar', length: 50, nullable: true })
  nivelCriticidad: string;

  @Column({ name: 'nivel_criticidad_numerico', type: 'numeric', nullable: true })
  nivelCriticidadNumerico: number;

  @Column({ name: 'fuente_nombre', type: 'varchar', length: 200, nullable: true })
  fuenteNombre: string;

  @Column({ name: 'tipo_fuente', type: 'varchar', length: 50, nullable: true })
  tipoFuente: string;

  @Column({ name: 'destino_nombre', type: 'varchar', length: 200, nullable: true })
  destinoNombre: string;

  @Column({ name: 'tipo_destino', type: 'varchar', length: 50, nullable: true })
  tipoDestino: string;

  @Column({ name: 'permite_ejecucion_paralela', type: 'smallint', nullable: true })
  permiteEjecucionParalela: number;

  @Column({ name: 'requiere_ventana_mantenimiento', type: 'smallint', nullable: true })
  requiereVentanaMantenimiento: number;

  @Column({ type: 'smallint', nullable: true })
  activo: number;

  @Column({ name: 'fecha_efectiva_desde', type: 'timestamp', nullable: true })
  fechaEfectivaDesde: Date;

  @Column({ name: 'fecha_efectiva_hasta', type: 'timestamp', nullable: true })
  fechaEfectivaHasta: Date;

  @Column({ name: 'es_vigente', type: 'boolean', default: true })
  esVigente: boolean;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
