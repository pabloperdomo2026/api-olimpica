import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('smr_moneda')
export class MonedaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'codigo_moneda', type: 'varchar', length: 25, unique: true })
  codigoMoneda: string;

  @Column({ name: 'codigo_iso_4217', type: 'char', length: 3 })
  codigoIso4217: string;

  @Column({ name: 'nombre_moneda', type: 'varchar', length: 128 })
  nombreMoneda: string;

  @Column({ name: 'simbolo_moneda', type: 'varchar', length: 10, nullable: true })
  simboloMoneda: string;

  @Column({ name: 'numero_decimales', type: 'smallint', default: 2 })
  numeroDecimales: number;

  @Column({ name: 'es_moneda_base', type: 'boolean', default: false })
  esMonedaBase: boolean;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
