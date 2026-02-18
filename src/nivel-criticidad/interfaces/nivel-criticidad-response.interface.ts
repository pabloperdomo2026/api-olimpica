export interface NivelCriticidadResponse {
  id: string;
  codigo: string;
  nombre: string;
  nivelNumerico: number;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
