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
import { TipoDestinoEntity } from '../tipo-destino/tipo-destino.entity';

@Entity('smr_destino_datos')
export class DestinoDatosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'tipo_destino', type: 'varchar', length: 50, nullable: true })
  tipoDestino: string;

  @Column({ name: 'endpoint_api', type: 'varchar', length: 500, nullable: true })
  endpointApi: string;

  @Column({ name: 'api_key_encriptado', type: 'varchar', length: 500, nullable: true })
  apiKeyEncriptado: string;

  @Column({ name: 'tamano_lote_registros', type: 'numeric', default: 350 })
  tamanoLoteRegistros: number;

  @Column({ name: 'tipo_destino_id', type: 'uuid' })
  tipoDestinoId: string;

  @ManyToOne(() => TipoDestinoEntity)
  @JoinColumn({ name: 'tipo_destino_id' })
  tipoDestinoRef: TipoDestinoEntity;

  @Column({ name: 'password_encriptado', type: 'varchar', length: 500, nullable: true })
  passwordEncriptado: string;

  @Column({ name: 'parametros_json', type: 'text', nullable: true })
  parametrosJson: string;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @Column({ name: 'tiempo_retencion', type: 'integer' })
  tiempoRetencion: number;

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
