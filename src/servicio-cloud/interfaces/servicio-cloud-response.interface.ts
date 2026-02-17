export interface ServicioCloudResponse {
  id: string;
  proveedorCloudId: string;
  proveedorCloudNombre?: string;
  region: string;
  cloudAccount: string;
  tipoServicio: string;
  nombreServicio: string;
  uriRecurso: string;
  parametrosJson: string;
  permiteInicio: string;
  permiteDetener: string;
  activo: string;
  organizacionId: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
