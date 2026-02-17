import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_punto_venta')
export class DmDimPuntoVentaEntity {
  @PrimaryColumn({ name: 'punto_venta_key', type: 'numeric' })
  puntoVentaKey: number;

  @Column({ name: 'punto_venta_id', type: 'numeric' })
  puntoVentaId: number;

  @Column({ name: 'codigo_tienda', type: 'varchar', length: 50, nullable: true })
  codigoTienda: string;

  @Column({ name: 'nombre_tienda', type: 'varchar', length: 200, nullable: true })
  nombreTienda: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  region: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  zona: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ciudad: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  departamento: string;

  @Column({ name: 'tipo_tienda', type: 'varchar', length: 50, nullable: true })
  tipoTienda: string;

  @Column({ name: 'tamano_tienda', type: 'varchar', length: 50, nullable: true })
  tamanoTienda: string;

  @Column({ name: 'fecha_apertura', type: 'date', nullable: true })
  fechaApertura: Date;

  @Column({ type: 'smallint', nullable: true })
  activo: number;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
