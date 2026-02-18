export interface TasaCambioResponse {
  tasaCambioId: number;
  monedaOrigenId: number;
  monedaDestinoId: number;
  tasaCambio: number;
  fechaVigenciaDesde?: Date;
  fechaVigenciaHasta?: Date;
  fuenteTasa?: string;
  activo: boolean;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}
