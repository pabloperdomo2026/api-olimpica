export interface TipoDatoResponse {
  id: string;
  codigo: string;
  nombre: string;
  tipoSql: string;
  tipoPython: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
