export interface OrganizacionResponse {
  id: string;
  codigoOrg: string;
  nombreOrg: string;
  razonSocial: string;
  nit: string;
  pais?: string;
  ciudad?: string;
  direccion?: string;
  telefonoContacto?: string;
  emailContacto?: string;
  activo: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
