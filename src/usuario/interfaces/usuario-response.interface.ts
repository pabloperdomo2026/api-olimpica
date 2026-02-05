export interface UsuarioResponse {
  usuarioId: string;
  organizacionId: string;
  email: string;
  nombre: string;
  apellido?: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
