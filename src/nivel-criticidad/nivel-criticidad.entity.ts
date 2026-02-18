import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('smr_nivel_criticidad')
export class NivelCriticidadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'codigo', type: 'varchar' })
  codigo: string;

  @Column({ name: 'nombre', type: 'varchar' })
  nombre: string;

  @Column({ name: 'nivel_numerico', type: 'numeric' })
  nivelNumerico: number;

  @Column({ name: 'activo', type: 'char' })
  activo: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @Column({ name: 'usuario_creacion', type: 'varchar' })
  usuarioCreacion: string;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'usuario_modificacion', type: 'varchar' })
  usuarioModificacion: string;
}