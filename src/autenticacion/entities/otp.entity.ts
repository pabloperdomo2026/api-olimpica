import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsuarioEntity } from '../../usuario/usuario.entity';

@Entity('smr_otp')
export class OtpEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'otp_id' })
  otpId: string;

  @Column({ type: 'uuid', name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => UsuarioEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @Column({ type: 'char', length: 4, unique: true })
  codigo: string;

  @Column({ type: 'timestamp', name: 'fecha_expiracion' })
  fechaExpiracion: Date;

  @Column({ type: 'boolean', default: false })
  usado: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;
}
