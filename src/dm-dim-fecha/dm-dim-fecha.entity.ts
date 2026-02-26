import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dim_fecha')
export class DmDimFechaEntity {
  @PrimaryColumn({ name: 'fecha_key', type: 'numeric' })
  fechaKey: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'numeric' })
  anio: number;

  @Column({ type: 'numeric' })
  mes: number;

  @Column({ type: 'numeric' })
  dia: number;

  @Column({ type: 'numeric', nullable: true })
  trimestre: number;

  @Column({ type: 'numeric', nullable: true })
  semestre: number;

  @Column({ name: 'numero_semana', type: 'numeric', nullable: true })
  numeroSemana: number;

  @Column({ name: 'dia_semana', type: 'numeric', nullable: true })
  diaSemana: number;

  @Column({ name: 'nombre_dia_semana', type: 'varchar', length: 20, nullable: true })
  nombreDiaSemana: string;

  @Column({ name: 'nombre_mes', type: 'varchar', length: 20, nullable: true })
  nombreMes: string;

  @Column({ name: 'nombre_trimestre', type: 'varchar', length: 40, nullable: true })
  nombreTrimestre: string;

  @Column({ name: 'anio_mes', type: 'varchar', length: 10, nullable: true })
  anioMes: string;

  @Column({ name: 'anio_trimestre', type: 'varchar', length: 10, nullable: true })
  anioTrimestre: string;

  @Column({ name: 'es_fin_semana', type: 'smallint', nullable: true })
  esFinSemana: number;

  @Column({ name: 'es_festivo', type: 'smallint', nullable: true })
  esFestivo: number;

  @Column({ name: 'nombre_festivo', type: 'varchar', length: 200, nullable: true })
  nombreFestivo: string;

  @Column({ name: 'es_dia_laboral', type: 'smallint', nullable: true })
  esDiaLaboral: number;

  @Column({ name: 'periodo_fiscal', type: 'varchar', length: 50, nullable: true })
  periodoFiscal: string;

  @Column({ name: 'anio_fiscal', type: 'numeric', nullable: true })
  anioFiscal: number;

  @Column({ name: 'mes_fiscal', type: 'numeric', nullable: true })
  mesFiscal: number;
}
