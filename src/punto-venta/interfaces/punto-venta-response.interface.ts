export interface PuntoVentaResponse {
  id: string;
  organizacionId: string;
  codigoTienda: string;
  nombreTienda: string;
  ciudad?: string;
  direccion?: string;
  activo: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
