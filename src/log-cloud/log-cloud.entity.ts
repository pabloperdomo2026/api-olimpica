import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EjecucionProcesoEntity } from '../ejecucion-proceso/ejecucion-proceso.entity';
import { ServicioCloudEntity } from '../servicio-cloud/servicio-cloud.entity';

@Entity('smr_log_cloud')
export class LogCloudEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ejecucion_proceso_id', type: 'uuid', nullable: true })
  ejecucionProcesoId: string;

  @ManyToOne(() => EjecucionProcesoEntity)
  @JoinColumn({ name: 'ejecucion_proceso_id' })
  ejecucionProceso: EjecucionProcesoEntity;

  @Column({ name: 'servicio_cloud_id', type: 'uuid' })
  servicioCloudId: string;

  @ManyToOne(() => ServicioCloudEntity)
  @JoinColumn({ name: 'servicio_cloud_id' })
  servicioCloud: ServicioCloudEntity;

  @Column({ name: 'fecha_log', type: 'date' })
  fechaLog: Date;

  @Column({ name: 'fecha_hora_log', type: 'timestamp' })
  fechaHoraLog: Date;

  @Column({ name: 'log_group', type: 'varchar', length: 500, nullable: true })
  logGroup: string;

  @Column({ name: 'log_stream', type: 'varchar', length: 500, nullable: true })
  logStream: string;

  @Column({ name: 'request_id', type: 'varchar', length: 200, nullable: true })
  requestId: string;

  @Column({ name: 'evento_tipo', type: 'varchar', length: 100, nullable: true })
  eventoTipo: string;

  @Column({ type: 'text', nullable: true })
  mensaje: string;

  @Column({ name: 'parametros_log', type: 'text' })
  parametrosLog: string;

  @Column({ name: 'metadata_json', type: 'text', nullable: true })
  metadataJson: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;

  @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
  usuarioModificacion: string;
}
