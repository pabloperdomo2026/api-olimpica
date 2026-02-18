import {
    Entity, PrimaryGeneratedColumn, Column
  } from 'typeorm';
  
  @Entity('smr_tasa_cambio')
  export class TasaCambioEntity {
  
    @PrimaryGeneratedColumn({ name: 'tasa_cambio_id' })
    tasaCambioId: number;
  
    @Column({ name: 'moneda_origen_id', type: 'numeric' })
    monedaOrigenId: number;
  
    @Column({ name: 'moneda_destino_id', type: 'numeric' })
    monedaDestinoId: number;
  
    @Column({ name: 'tasa_cambio', type: 'numeric', precision: 18, scale: 6 })
    tasaCambio: number;
  
    @Column({ name: 'fecha_vigencia_desde', type: 'date', nullable: true })
    fechaVigenciaDesde: Date;
  
    @Column({ name: 'fecha_vigencia_hasta', type: 'date', nullable: true })
    fechaVigenciaHasta: Date;
  
    @Column({ name: 'fuente_tasa', type: 'varchar', nullable: true })
    fuenteTasa: string;
  
    @Column({ name: 'activo', type: 'char', length: 1, nullable: true })
    activo: string;
  
    @Column({ name: 'fecha_creacion', type: 'timestamp', nullable: true })
    fechaCreacion: Date;
  
    @Column({ name: 'usuario_creacion', type: 'varchar', nullable: true })
    usuarioCreacion: string;
  
    @Column({ name: 'fecha_modificacion', type: 'timestamp', nullable: true })
    fechaModificacion: Date;
  
    @Column({ name: 'usuario_modificacion', type: 'varchar', nullable: true })
    usuarioModificacion: string;
  }