export interface FuenteDatosResponse {
  id: string;
  tipoFuenteId: string;
  codigo: string;
  nombre: string;
  host: string | null;
  puerto: number | null;
  nombreBaseDatos: string | null;
  usuario: string | null;
  parametrosJson: string | null;
  tiempoRetencion: number;
  organizacionId: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion: Date;
}
