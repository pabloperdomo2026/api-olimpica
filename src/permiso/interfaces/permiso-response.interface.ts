export interface PermisoResponse {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  activo: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
