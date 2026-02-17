import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_destino')
export class DmDimDestinoEntity {
  @PrimaryColumn({ name: 'destino_key', type: 'numeric' })
  destinoKey: number;

  @Column({ name: 'destino_id', type: 'numeric' })
  destinoId: number;

  @Column({ name: 'codigo_destino', type: 'varchar', length: 50, nullable: true })
  codigoDestino: string;

  @Column({ name: 'nombre_destino', type: 'varchar', length: 200, nullable: true })
  nombreDestino: string;

  @Column({ name: 'tipo_destino', type: 'varchar', length: 50, nullable: true })
  tipoDestino: string;

  @Column({ name: 'categoria_destino', type: 'varchar', length: 50, nullable: true })
  categoriaDestino: string;

  @Column({ type: 'smallint', nullable: true })
  activo: number;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
