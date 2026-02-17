import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_status')
export class DmDimStatusEntity {
  @PrimaryColumn({ name: 'status_key', type: 'numeric' })
  statusKey: number;

  @Column({ name: 'status_id', type: 'numeric' })
  statusId: number;

  @Column({ name: 'codigo_status', type: 'varchar', length: 50, nullable: true })
  codigoStatus: string;

  @Column({ name: 'nombre_status', type: 'varchar', length: 200, nullable: true })
  nombreStatus: string;

  @Column({ name: 'categoria_status', type: 'varchar', length: 50, nullable: true })
  categoriaStatus: string;

  @Column({ name: 'es_final', type: 'smallint', nullable: true })
  esFinal: number;

  @Column({ name: 'es_exitoso', type: 'smallint', nullable: true })
  esExitoso: number;

  @Column({ name: 'es_error', type: 'smallint', nullable: true })
  esError: number;

  @Column({ name: 'permite_reintento', type: 'smallint', nullable: true })
  permiteReintento: number;

  @Column({ name: 'orden_visualizacion', type: 'numeric', nullable: true })
  ordenVisualizacion: number;

  @Column({ name: 'color_hex', type: 'varchar', length: 7, nullable: true })
  colorHex: string;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
