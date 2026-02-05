export interface Rol {
  id?: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  activo: string;
  fechaCreacion: Date;
  usuarioCreacion?: string;
  fechaModificacion?: Date;
  usuarioModificacion?: string;
}
