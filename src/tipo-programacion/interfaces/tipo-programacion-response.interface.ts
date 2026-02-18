export interface TipoProgramacionResponse {
  id: string;
  codigo: string;
  nombre: string;
  requiereCron: boolean;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
