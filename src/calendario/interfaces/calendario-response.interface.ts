export interface CalendarioResponse {
  fechaId: number;
  pais: string;
  fecha: Date;
  anio: number;
  mes: number;
  dia: number;
  esFinSemana: boolean;
  esFestivo: boolean;
  esDiaLaboral: boolean;
  organizacionId: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
