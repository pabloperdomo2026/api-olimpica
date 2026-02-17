import { UsuarioEntity } from 'src/usuario/usuario.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('smr_organizacion')
  export class OrganizacionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'codigo_org', type: 'varchar', length: 50, unique: true })
    codigoOrg: string;
  
    @Column({ name: 'nombre_org', type: 'varchar', length: 255 })
    nombreOrg: string;
  
    @Column({ name: 'razon_social', type: 'varchar', length: 255 })
    razonSocial: string;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    nit: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    pais: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    ciudad: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    direccion: string;
  
    @Column({ name: 'telefono_contacto', type: 'varchar', length: 50, nullable: true })
    telefonoContacto: string;
  
    @Column({ name: 'email_contacto', type: 'varchar', length: 255, nullable: true })
    emailContacto: string;
  
    @Column({ type: 'char', length: 1, default: 'S' })
    activo: string;
  
    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion: Date;
  
    @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
    usuarioCreacion: string;
  
    @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
    fechaModificacion: Date;
  
    @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
    usuarioModificacion: string;
  
    @Column({ name: 'pertenece_a', type: 'integer', nullable: true })
    perteneceA: number;

    @OneToMany(() => UsuarioEntity, (usuario) => usuario.organizacion)
    usuarios: UsuarioEntity
  }