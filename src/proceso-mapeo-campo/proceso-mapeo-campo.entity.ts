import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProcesoEntity } from '../proceso/proceso.entity';
import { ColumnaOrigenEntity } from '../columna-origen/columna-origen.entity';
import { ColumnaDestinoEntity } from '../columna-destino/columna-destino.entity';

@Entity('smr_proceso_mapeo_campo')
export class ProcesoMapeoCampoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_columna', type: 'varchar', length: 200 })
  nombreColumna: string;

  @Column({ name: 'secuencia_generacion_tabular', type: 'integer', nullable: true })
  secuenciaGeneracionTabular: number;

  @Column({ name: 'posicion_ordinal', type: 'numeric', nullable: true })
  posicionOrdinal: number;

  @Column({ name: 'es_nullable', type: 'boolean', default: true })
  esNullable: boolean;

  @Column({ name: 'es_pii', type: 'boolean', default: false })
  esPii: boolean;

  @Column({ name: 'nombre_campo_origen', type: 'varchar', length: 200, nullable: true })
  nombreCampoOrigen: string;

  @Column({ name: 'nombre_campo_destino', type: 'varchar', length: 200 })
  nombreCampoDestino: string;

  @Column({ name: 'destino_obliga_case', type: 'integer', nullable: true })
  destinoObligaCase: number;

  @Column({ name: 'formato_origen', type: 'text', nullable: true })
  formatoOrigen: string;

  @Column({ name: 'formato_destino', type: 'text', nullable: true })
  formatoDestino: string;

  @Column({ name: 'tipo_expresion', type: 'varchar', length: 100 })
  tipoExpresion: string;

  @Column({ name: 'expresion_transformacion', type: 'varchar', length: 4000, nullable: true })
  expresionTransformacion: string;

  @Column({ name: 'columna_destino_id', type: 'uuid' })
  columnaDestinoId: string;

  @ManyToOne(() => ColumnaDestinoEntity)
  @JoinColumn({ name: 'columna_destino_id' })
  columnaDestino: ColumnaDestinoEntity;

  @Column({ name: 'columna_origen_id', type: 'uuid' })
  columnaOrigenId: string;

  @ManyToOne(() => ColumnaOrigenEntity)
  @JoinColumn({ name: 'columna_origen_id' })
  columnaOrigen: ColumnaOrigenEntity;

  @Column({ name: 'proceso_id', type: 'uuid' })
  procesoId: string;

  @ManyToOne(() => ProcesoEntity)
  @JoinColumn({ name: 'proceso_id' })
  proceso: ProcesoEntity;

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
