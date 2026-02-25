export interface ConfiguracionSlaResponse {
  id: string;
  procesoId: string;
  procesoNombre?: string;
  procesoCodigo?: string;
  nombre: string;
  tiempoMaximoEjecucionMinutos?: number;
  horaLimiteFinalizacion?: Date;
  porcentajeRegistrosMinimo?: number;
  umbralErrorPorcentaje?: number;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
