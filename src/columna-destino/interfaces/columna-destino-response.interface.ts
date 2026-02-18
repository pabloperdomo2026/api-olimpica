export interface ColumnaDestinoResponse {
  id: string;
  nombreColumna: string;
  destinoId: string;
  tipoDatoId: string;
  posicionOrdinal?: number;
  esNullable: boolean;
  esPii: boolean;
  obligaCase?: boolean;
  formatoEsperado?: string;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
