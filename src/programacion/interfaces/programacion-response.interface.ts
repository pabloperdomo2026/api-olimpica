export interface ProgramacionResponse {
  id: string;
  nombre: string;
  expresionCron: string | null;
  frecuenciaMinutos: number | null;
  activo: string;
  proceso: {
    id: string;
    nombre: string;
    codigo: string;
  } | null;
  tipoProgramacion: {
    id: string;
    nombre: string;
  } | null;
  fechaCreacion: Date;
  fechaModificacion: Date;
}
