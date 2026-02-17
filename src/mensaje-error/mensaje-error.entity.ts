import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('smr_mensaje_error')
export class MensajeErrorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'codigo_error', type: 'varchar', length: 50, unique: true })
  codigoError: string;

  @Column({ name: 'categoria_error_id', type: 'numeric', nullable: true })
  categoriaErrorId: number;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'mensaje_plantilla', type: 'varchar', length: 1000, nullable: true })
  mensajePlantilla: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  severidad: string;

  @Column({ name: 'codigo_http_sugerido', type: 'numeric', nullable: true })
  codigoHttpSugerido: number;

  @Column({ name: 'es_recuperable', type: 'boolean', default: false })
  esRecuperable: boolean;

  @Column({ type: 'char', length: 1, default: 'S' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;
}
