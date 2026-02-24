export interface ColumnaOrigenResponse {
  id: string;
  fuenteId: string;
  tipoDatoId: string;
  tablaNombre?: string;
  nombreColumna: string;
  posicionOrdinal: number | null;
  esNullable: boolean;
  esPii: boolean;
  obligaCase: boolean | null;
  formatoEsperado: string | null;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion: Date;
}
