export interface ConfiguracionAlertaResponse {
  id: string;
  tipoAlertaId: string;
  tipoAlertaNombre?: string;
  tipoAlertaCodigo?: string;
  procesoId: string;
  procesoNombre?: string;
  procesoCodigo?: string;
  recipienteId: string;
  recipienteNombre?: string;
  nombre: string;
  templateMensaje: string;
  condicionDisparo?: string;
  tiempoEvaluacion?: number;
  umbralValor?: string;
  activo: boolean;
  fechaCreacion: Date;
}
