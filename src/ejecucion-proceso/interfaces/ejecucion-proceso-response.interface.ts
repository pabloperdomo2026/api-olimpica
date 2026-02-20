export interface EjecucionProcesoResponse {
  id: string;
  organizacionId: string;
  procesoId: string;
  procesoNombre?: string;
  procesoCodigo?: string;
  statusProcesoId: string;
  estadoNombre?: string;
  estadoCodigo?: string;
  fechaEjecucion: Date;
  fechaHoraInicio: Date;
  fechaHoraFin?: Date;
  tipoEjecucion?: string;
  numeroRegistrosProcesados?: number;
  numeroRegistrosExitosos?: number;
  numeroRegistrosFallidos?: number;
  duracionSegundos?: number;
  usuarioSolicita?: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
