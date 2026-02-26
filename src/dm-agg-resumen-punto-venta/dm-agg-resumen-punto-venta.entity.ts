import { OrganizacionEntity } from 'src/organizacion/organizacion.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('smr_agg_resumen_punto_venta')
export class DmAggResumenPuntoVentaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @PrimaryColumn({ name: 'punto_venta_key', type: 'numeric' })
  puntoVentaKey: number;

  @Column({ name: 'total_ejecuciones', type: 'numeric', nullable: true })
  totalEjecuciones: number;

  @Column({ name: 'ejecuciones_exitosas', type: 'numeric', nullable: true })
  ejecucionesExitosas: number;

  @Column({ name: 'ejecuciones_fallidas', type: 'numeric', nullable: true })
  ejecucionesFallidas: number;

  @Column({ name: 'total_lotes_procesados', type: 'numeric', nullable: true })
  totalLotesProcesados: number;

  @Column({ name: 'total_lotes_exitosos', type: 'numeric', nullable: true })
  totalLotesExitosos: number;

  @Column({ name: 'total_lotes_fallidos', type: 'numeric', nullable: true })
  totalLotesFallidos: number;

  @Column({ name: 'total_registros_procesados', type: 'numeric', nullable: true })
  totalRegistrosProcesados: number;

  @Column({ name: 'total_registros_exitosos', type: 'numeric', nullable: true })
  totalRegistrosExitosos: number;

  @Column({ name: 'total_registros_fallidos', type: 'numeric', nullable: true })
  totalRegistrosFallidos: number;

  @Column({ name: 'porcentaje_exito_promedio', type: 'numeric', precision: 5, scale: 2, nullable: true })
  porcentajeExitoPromedio: number;

  @Column({ name: 'fecha_actualizacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaActualizacion: Date;

  @Column({ name: 'organizacion_id', type: 'uuid', nullable: true, default: null })
  organizacionId: number;

  @ManyToOne(() => OrganizacionEntity, (organizacion) => organizacion.resumenes, {
    nullable: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'organizacion_id', })
  organizacion: OrganizacionEntity;
}
