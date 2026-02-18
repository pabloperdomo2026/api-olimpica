export interface TipoFuenteResponse {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  requiereCredenciales: boolean;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
