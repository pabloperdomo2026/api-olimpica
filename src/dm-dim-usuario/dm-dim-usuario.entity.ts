import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity('smr_dm_dim_usuario')
export class DmDimUsuarioEntity {
  @PrimaryColumn({ name: 'usuario_key', type: 'numeric' })
  usuarioKey: number;

  @Column({ name: 'usuario_id', type: 'numeric' })
  usuarioId: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  username: string;

  @Column({ name: 'nombre_completo', type: 'varchar', length: 200, nullable: true })
  nombreCompleto: string;

  @Column({ name: 'rol_principal', type: 'varchar', length: 50, nullable: true })
  rolPrincipal: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  departamento: string;

  @Column({ type: 'smallint', nullable: true })
  activo: number;

  @Column({ name: 'organizacion_id', type: 'bigint' })
  organizacionId: number;
}
