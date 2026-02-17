import { ProveedorCloudEntity } from 'src/proveedor-cloud/proveedor-cloud.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('smr_servicio_cloud')
  export class ServicioCloudEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'proveedor_cloud_id', type: 'numeric' })
    proveedorCloudId: number;
  
    @Column({ type: 'varchar', length: 100 })
    region: string;
  
    @Column({ name: 'cloud_account', type: 'varchar', length: 100 })
    cloudAccount: string;
  
    @Column({ name: 'token_secret', type: 'varchar', length: 255 })
    tokenSecret: string;
  
    @Column({ name: 'tipo_servicio', type: 'varchar', length: 50 })
    tipoServicio: string;
  
    @Column({ name: 'nombre_servicio', type: 'varchar', length: 100 })
    nombreServicio: string;
  
    @Column({ name: 'uri_recurso', type: 'varchar', length: 255 })
    uriRecurso: string;
  
    @Column({ name: 'parametros_json', type: 'text' })
    parametrosJson: string;
  
    @Column({ name: 'permite_inicio', type: 'char', length: 1, default: 'N' })
    permiteInicio: string;
  
    @Column({ name: 'permite_detener', type: 'char', length: 1, default: 'N' })
    permiteDetener: string;
  
    @Column({ type: 'char', length: 1, default: 'A' })
    activo: string;
  
    @CreateDateColumn({
      name: 'fecha_creacion',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    fechaCreacion: Date;
  
    @Column({ name: 'usuario_creacion', type: 'varchar', length: 50 })
    usuarioCreacion: string;
  
    @UpdateDateColumn({
      name: 'fecha_modificacion',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    fechaModificacion: Date;
  
    @Column({ name: 'usuario_modificacion', type: 'varchar', length: 50, nullable: true })
    usuarioModificacion: string;
  
    @Column({ name: 'organizacion_id', type: 'numeric' })
    organizacionId: number;
  
    @ManyToOne(() => ProveedorCloudEntity)
    @JoinColumn({ name: 'proveedor_cloud_id' })
    proveedorCloud: ProveedorCloudEntity;
  }