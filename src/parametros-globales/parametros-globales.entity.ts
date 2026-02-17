import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';

@Entity('smr_parametros_globales')
export class ParametrosGlobalesEntity {
  @PrimaryColumn({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @PrimaryColumn({ name: 'item_grupo', type: 'varchar', length: 25 })
  itemGrupo: string;

  @PrimaryColumn({ name: 'item_atributo', type: 'varchar', length: 25 })
  itemAtributo: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @Column({ name: 'item_descripcion', type: 'varchar', length: 128 })
  itemDescripcion: string;

  @Column({ name: 'valor_retornar', type: 'varchar', length: 4000 })
  valorRetornar: string;

  @Column({ name: 'es_defecto', type: 'boolean', default: false })
  esDefecto: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
