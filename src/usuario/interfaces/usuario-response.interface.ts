export interface UsuarioResponse {
  id: string;
  organizacionId?: string;
  email: string;
  nombre: string;
  apellido?: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
