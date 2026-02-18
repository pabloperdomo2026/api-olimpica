export interface ProcesoMapeoCampoResponse {
  id: string;
  nombreColumna: string;
  secuenciaGeneracionTabular?: number;
  posicionOrdinal?: number;
  esNullable: boolean;
  esPii: boolean;
  nombreCampoOrigen?: string;
  nombreCampoDestino: string;
  destinoObligaCase?: number;
  formatoOrigen?: string;
  formatoDestino?: string;
  tipoExpresion: string;
  expresionTransformacion?: string;
  columnaDestinoId: string;
  columnaOrigenId: string;
  procesoId: string;
  activo: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}
