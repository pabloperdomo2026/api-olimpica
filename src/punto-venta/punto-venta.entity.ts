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

  @Entity('smr_punto_venta')
  export class PuntoVentaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'organizacion_id', type: 'uuid' })
    organizacionId: string;

    @ManyToOne(() => OrganizacionEntity)
    @JoinColumn({ name: 'organizacion_id' })
    organizacion: OrganizacionEntity;
  
    @Column({ name: 'codigo_tienda', type: 'varchar', length: 50 })
    codigoTienda: string;
  
    @Column({ name: 'nombre_tienda', type: 'varchar', length: 255 })
    nombreTienda: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    ciudad: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    direccion: string;
  
    @Column({ type: 'char', length: 1, default: 'S' })
    activo: string;
  
    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion: Date;
  
    @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
    fechaModificacion: Date;
  
    @Column({ name: 'usuario_modificacion', type: 'varchar', length: 100, nullable: true })
    usuarioModificacion: string;
  
    @Column({ name: 'usuario_creacion', type: 'varchar', length: 100, nullable: true })
    usuarioCreacion: string;
  }