export interface MonedaResponse {
  id: string;
  codigoMoneda: string;
  codigoIso4217: string;
  nombreMoneda: string;
  simboloMoneda?: string;
  numeroDecimales: number;
  esMonedaBase: boolean;
  activo: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
