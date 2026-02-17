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

  @Entity('smr_proceso')
  export class ProcesoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'organizacion_id', type: 'uuid' })
    organizacionId: string;

    @ManyToOne(() => OrganizacionEntity)
    @JoinColumn({ name: 'organizacion_id' })
    organizacion: OrganizacionEntity;
  
    @Column({ name: 'tipo_proceso_id', type: 'integer' })
    tipoProcesoId: number;
  
    @Column({ name: 'nivel_criticidad_id', type: 'integer' })
    nivelCriticidadId: number;
  
    @Column({ type: 'varchar', length: 50 })
    codigo: string;
  
    @Column({ type: 'varchar', length: 255 })
    nombre: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    version: string;
  
    @Column({ name: 'id_workflow_cloud', type: 'varchar', length: 255, nullable: true })
    idWorkflowCloud: string;
  
    @Column({ name: 'workflow_secret', type: 'varchar', length: 255, nullable: true })
    workflowSecret: string;
  
    @Column({ name: 'parametros_json', type: 'text', nullable: true })
    parametrosJson: string;
  
    @Column({ name: 'servicio_cloud_id', type: 'integer', nullable: true })
    servicioCloudId: number;
  
    @Column({ name: 'es_proceso_inicial', type: 'char', length: 1, default: 'N' })
    esProcesoInicial: string;
  
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
  
    @Column({ name: 'destino_id', type: 'integer', nullable: true })
    destinoId: number;
  
    @Column({ name: 'fuente_id', type: 'integer', nullable: true })
    fuenteId: number;

  }