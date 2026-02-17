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
  import { PermisoEntity } from '../permiso/permiso.entity';

  @Entity('smr_rol_permiso')
  export class RolPermisoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'rol_id', type: 'uuid' })
    rolId: string;

    @ManyToOne(() => RolEntity)
    @JoinColumn({ name: 'rol_id' })
    rol: RolEntity;

    @Column({ name: 'permiso_id', type: 'uuid' })
    permisoId: string;

    @ManyToOne(() => PermisoEntity)
    @JoinColumn({ name: 'permiso_id' })
    permiso: PermisoEntity;

    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion: Date;

    @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
    usuarioCreacion: string;

    @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
    fechaModificacion: Date;

    @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
    usuarioModificacion: string;
  }
