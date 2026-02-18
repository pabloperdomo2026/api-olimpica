export interface TipoProcesoResponse {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
