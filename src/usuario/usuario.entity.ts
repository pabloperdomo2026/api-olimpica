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
  
  @Entity('smr_dim_usuario')
  export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;
  
    @Column({ type: 'uuid', name: 'organizacion_id' })
    organizacionId: string;

    @ManyToOne(() => OrganizacionEntity)
    @JoinColumn({ name: 'organizacion_id' })
    organizacion: OrganizacionEntity;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255, name: 'password_hash' })
    passwordHash: string;
  
    @Column({ type: 'varchar', length: 100 })
    nombre: string;
  
    @Column({ type: 'varchar', length: 100 })
    apellido: string;
  
    @Column({ type: 'char', length: 1, default: 'S' })
    activo: string;
  
    @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
    fechaCreacion: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion' })
    fechaModificacion: Date;
  
    @Column({ type: 'varchar', length: 100, nullable: true, name: 'usuario_creacion' })
    usuarioCreacion: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true, name: 'usuario_modificacion' })
    usuarioModificacion: string;
}