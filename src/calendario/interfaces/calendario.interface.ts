export interface Calendario {
  fechaId?: number;
  pais: string;
  fecha: Date;
  anio: number;
  mes: number;
  dia: number;
  esFinSemana: string;
  esFestivo: string;
  esDiaLaboral: string;
  organizacionId: string;
  usuarioCreacion?: string;
  usuarioModificacion?: string;
}
