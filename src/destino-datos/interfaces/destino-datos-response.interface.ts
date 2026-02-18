export interface DestinoDatosResponse {
  id: string;
  codigo: string;
  nombre: string;
  tipoDestino?: string;
  endpointApi?: string;
  tamanoLoteRegistros: number;
  tipoDestinoId: string;
  organizacionId: string;
  tiempoRetencion: number;
  parametrosJson?: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
