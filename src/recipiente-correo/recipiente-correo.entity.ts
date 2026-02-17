import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';

@Entity('smr_recipiente_correo')
export class RecipienteCorreoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  descripcion: string;

  @Column({ name: 'tipo_recipiente', type: 'varchar', length: 50, nullable: true })
  tipoRecipiente: string;

  @Column({ name: 'arn_sns', type: 'varchar', length: 500, nullable: true })
  arnSns: string;

  @Column({ name: 'arn_sqs', type: 'varchar', length: 500, nullable: true })
  arnSqs: string;

  @Column({ name: 'emails_destino', type: 'varchar', length: 2000, nullable: true })
  emailsDestino: string;

  @Column({ name: 'region_aws', type: 'varchar', length: 50, nullable: true })
  regionAws: string;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @ManyToOne(() => OrganizacionEntity)
  @JoinColumn({ name: 'organizacion_id' })
  organizacion: OrganizacionEntity;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
  usuarioCreacion: string;
}
