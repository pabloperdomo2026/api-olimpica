import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DestinoDatosEntity } from '../destino-datos/destino-datos.entity';
import { TipoDatoEntity } from '../tipo-dato/tipo-dato.entity';

@Entity('smr_columna_destino')
export class ColumnaDestinoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_columna', type: 'varchar', length: 200 })
  nombreColumna: string;

  @Column({ name: 'posicion_ordinal', type: 'numeric', nullable: true })
  posicionOrdinal: number;

  @Column({ name: 'es_nullable', type: 'boolean', default: true })
  esNullable: boolean;

  @Column({ name: 'es_pii', type: 'boolean', default: false })
  esPii: boolean;

  @Column({ name: 'obliga_case', type: 'boolean', nullable: true })
  obligaCase: boolean;

  @Column({ name: 'tipo_dato_id', type: 'uuid' })
  tipoDatoId: string;

  @ManyToOne(() => TipoDatoEntity)
  @JoinColumn({ name: 'tipo_dato_id' })
  tipoDato: TipoDatoEntity;

  @Column({ name: 'destino_id', type: 'uuid' })
  destinoId: string;

  @ManyToOne(() => DestinoDatosEntity)
  @JoinColumn({ name: 'destino_id' })
  destino: DestinoDatosEntity;

  @Column({ name: 'formato_esperado', type: 'varchar', length: 200, nullable: true })
  formatoEsperado: string;

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
