import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('smr_calendario')
export class CalendarioEntity {

    @PrimaryGeneratedColumn({ name: 'fecha_id' })  // Quita el type: 'numeric'
    fechaId: number;

  @Column({ name: 'pais', type: 'varchar' })
  pais: string;

  @Column({ name: 'fecha', type: 'date' })
  fecha: Date;

  @Column({ name: 'anio', type: 'numeric' })
  anio: number;

  @Column({ name: 'mes', type: 'numeric' })
  mes: number;

  @Column({ name: 'dia', type: 'numeric' })
  dia: number;

  @Column({ name: 'es_fin_semana', type: 'char', length: 1 })
  esFinSemana: string;

  @Column({ name: 'es_festivo', type: 'char', length: 1 })
  esFestivo: string;

  @Column({ name: 'es_dia_laboral', type: 'char', length: 1 })
  esDiaLaboral: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @Column({ name: 'organizacion_id', type: 'uuid' })
  organizacionId: string;

  @Column({ name: 'usuario_creacion', type: 'varchar', nullable: true })
  usuarioCreacion?: string;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_modificacion', type: 'varchar', nullable: true })
  usuarioModificacion?: string;
}