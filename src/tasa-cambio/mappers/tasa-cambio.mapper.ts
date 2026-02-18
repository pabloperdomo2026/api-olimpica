import { TasaCambioResponse } from '../interfaces/tasa-cambio-response.interface';
import { TasaCambioEntity } from '../tasa-cambio.entity';

export const listarTasasCambioMapper = (items: TasaCambioEntity[]): TasaCambioResponse[] => {
  return items.map((i) => tasaCambioMapper(i));
};

export const tasaCambioMapper = (i: TasaCambioEntity): TasaCambioResponse => ({
  tasaCambioId: i.tasaCambioId,
  monedaOrigenId: i.monedaOrigenId,
  monedaDestinoId: i.monedaDestinoId,
  tasaCambio: Number(i.tasaCambio),
  fechaVigenciaDesde: i.fechaVigenciaDesde || undefined,
  fechaVigenciaHasta: i.fechaVigenciaHasta || undefined,
  fuenteTasa: i.fuenteTasa || undefined,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion || undefined,
  fechaModificacion: i.fechaModificacion || undefined,
});
