import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EjecucionLoteEntity } from '../ejecucion-lote/ejecucion-lote.entity';
import { StatusProcesoEntity } from '../status-proceso/status-proceso.entity';

@Entity('smr_ejecucion_detalle_registro')
export class EjecucionDetalleRegistroEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ejecucion_lote_id', type: 'uuid' })
  ejecucionLoteId: string;

  @ManyToOne(() => EjecucionLoteEntity)
  @JoinColumn({ name: 'ejecucion_lote_id' })
  ejecucionLote: EjecucionLoteEntity;

  @Column({ name: 'fecha_ejecucion', type: 'date' })
  fechaEjecucion: Date;

  @Column({ name: 'punto_venta_id', type: 'numeric', nullable: true })
  puntoVentaId: number;

  @Column({ name: 'codigo_tienda', type: 'varchar', length: 50, nullable: true })
  codigoTienda: string;

  @Column({ name: 'fecha_transaccion', type: 'date', nullable: true })
  fechaTransaccion: Date;

  @Column({ name: 'ticket_id', type: 'varchar', length: 100, nullable: true })
  ticketId: string;

  @Column({ name: 'numero_registro_lote', type: 'numeric', nullable: true })
  numeroRegistroLote: number;

  @Column({ name: 'status_proceso_id', type: 'uuid' })
  statusProcesoId: string;

  @ManyToOne(() => StatusProcesoEntity)
  @JoinColumn({ name: 'status_proceso_id' })
  statusProceso: StatusProcesoEntity;

  @Column({ name: 'mensaje_error', type: 'varchar', length: 4000, nullable: true })
  mensajeError: string;

  @Column({ name: 'codigo_error', type: 'varchar', length: 50, nullable: true })
  codigoError: string;

  @Column({ name: 'datos_registro_json', type: 'text', nullable: true })
  datosRegistroJson: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;
}
