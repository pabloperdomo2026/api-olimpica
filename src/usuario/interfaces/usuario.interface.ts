export interface Usuario {
  usuarioId?: string;
  organizacionId: string;
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
