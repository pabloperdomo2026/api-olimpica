import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_tiempo')
export class DmDimTiempoEntity {
  @PrimaryColumn({ name: 'tiempo_key', type: 'numeric' })
  tiempoKey: number;

  @Column({ type: 'numeric' })
  hora: number;

  @Column({ type: 'numeric' })
  minuto: number;

  @Column({ type: 'numeric', nullable: true })
  segundo: number;

  @Column({ name: 'hora_24', type: 'varchar', length: 8, nullable: true })
  hora24: string;

  @Column({ name: 'hora_12', type: 'varchar', length: 11, nullable: true })
  hora12: string;

  @Column({ name: 'periodo_dia', type: 'varchar', length: 20, nullable: true })
  periodoDia: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  turno: string;

  @Column({ name: 'es_horario_laboral', type: 'smallint', nullable: true })
  esHorarioLaboral: number;

  @Column({ name: 'es_horario_pico', type: 'smallint', nullable: true })
  esHorarioPico: number;
}
