import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_tipo_error')
export class DmDimTipoErrorEntity {
  @PrimaryColumn({ name: 'tipo_error_key', type: 'numeric' })
  tipoErrorKey: number;

  @Column({ name: 'codigo_error', type: 'varchar', length: 50, nullable: true })
  codigoError: string;

  @Column({ name: 'categoria_error', type: 'varchar', length: 100, nullable: true })
  categoriaError: string;

  @Column({ name: 'es_error_tecnico', type: 'smallint', nullable: true })
  esErrorTecnico: number;

  @Column({ name: 'es_error_negocio', type: 'smallint', nullable: true })
  esErrorNegocio: number;

  @Column({ name: 'es_error_datos', type: 'smallint', nullable: true })
  esErrorDatos: number;

  @Column({ name: 'es_recuperable', type: 'smallint', nullable: true })
  esRecuperable: number;

  @Column({ type: 'numeric', nullable: true })
  severidad: number;

  @Column({ name: 'nombre_severidad', type: 'varchar', length: 50, nullable: true })
  nombreSeveridad: string;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
