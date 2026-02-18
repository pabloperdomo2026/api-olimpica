export interface TipoAlertaResponse {
  id: string;
  codigo: string;
  nombre: string;
  severidad: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
