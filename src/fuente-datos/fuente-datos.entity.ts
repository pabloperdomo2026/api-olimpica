import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';
import { TipoFuenteEntity } from '../tipo-fuente/tipo-fuente.entity';

@Entity('smr_fuente_datos')
export class FuenteDatosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tipo_fuente_id', type: 'uuid' })
  tipoFuenteId: string;

  @ManyToOne(() => TipoFuenteEntity)
  @JoinColumn({ name: 'tipo_fuente_id' })
  tipoFuente: TipoFuenteEntity;

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  host: string;

  @Column({ type: 'numeric', nullable: true })
  puerto: number;

  @Column({ name: 'nombre_base_datos', type: 'varchar', length: 200, nullable: true })
  nombreBaseDatos: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  usuario: string;

  @Column({ name: 'password_encriptado', type: 'varchar', length: 500, nullable: true })
  passwordEncriptado: string;

  @Column({ name: 'parametros_json', type: 'text', nullable: true })
  parametrosJson: string;

  @Column({ name: 'tiempo_retencion', type: 'integer' })
  tiempoRetencion: number;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
