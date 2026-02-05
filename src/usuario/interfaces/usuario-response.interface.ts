export interface UsuarioResponse {
  usuarioId: number;
  organizacionId: number;
  email: string;
  nombre: string;
  apellido?: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
