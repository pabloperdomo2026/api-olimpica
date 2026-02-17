import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

  @Entity('smr_usuario_rol')
  export class UsuarioRolEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'rol_id', type: 'uuid' })
    rolId: string;

    @ManyToOne(() => RolEntity)
    @JoinColumn({ name: 'rol_id' })
    rol: RolEntity;

    @Column({ name: 'usuario_id', type: 'uuid' })
    usuarioId: string;

    @ManyToOne(() => UsuarioEntity)
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioEntity;

    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion: Date;

    @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
    usuarioCreacion: string;

    @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
    fechaModificacion: Date;

    @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
    usuarioModificacion: string;
  }
