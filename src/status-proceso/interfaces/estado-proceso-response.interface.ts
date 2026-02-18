export interface EstadoProcesoResponse {
  id: string;
  codigo: string;
  nombre: string;
  esInicial: boolean;
  esFinal: boolean;
  esExitoso: boolean;
  esError: boolean;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
