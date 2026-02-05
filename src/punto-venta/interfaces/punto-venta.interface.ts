export interface PuntoVenta {
  id?: string;
  organizacionId: string;
  codigoTienda: string;
  nombreTienda: string;
  ciudad?: string;
  direccion?: string;
  activo: string;
  fechaCreacion: Date;
  usuarioCreacion?: string;
  fechaModificacion?: Date;
  usuarioModificacion?: string;
}
