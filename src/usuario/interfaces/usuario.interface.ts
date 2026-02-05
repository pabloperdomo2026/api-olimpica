export interface Usuario {
  usuarioId: number;
  organizacionId: number;
  email: string;
  passwordHash: string;
  nombre: string;
  apellido?: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
  usuarioCreacion?: string;
  usuarioModificacion?: string;
}
