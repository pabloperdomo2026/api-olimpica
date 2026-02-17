import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_fuente')
export class DmDimFuenteEntity {
  @PrimaryColumn({ name: 'fuente_key', type: 'numeric' })
  fuenteKey: number;

  @Column({ name: 'fuente_id', type: 'numeric' })
  fuenteId: number;

  @Column({ name: 'codigo_fuente', type: 'varchar', length: 50, nullable: true })
  codigoFuente: string;

  @Column({ name: 'nombre_fuente', type: 'varchar', length: 200, nullable: true })
  nombreFuente: string;

  @Column({ name: 'tipo_fuente', type: 'varchar', length: 50, nullable: true })
  tipoFuente: string;

  @Column({ name: 'categoria_fuente', type: 'varchar', length: 50, nullable: true })
  categoriaFuente: string;

  @Column({ type: 'smallint', nullable: true })
  activo: number;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
