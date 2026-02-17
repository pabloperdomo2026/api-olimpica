import { MonedaResponse } from '../interfaces/moneda-response.interface';
import { MonedaEntity } from '../moneda.entity';

export const listarMonedasMapper = (monedas: MonedaEntity[]): MonedaResponse[] => {
  return monedas.map((moneda) => monedaMapper(moneda));
};

export const monedaMapper = (moneda: MonedaEntity): MonedaResponse => ({
  id: moneda.id,
  codigoMoneda: moneda.codigoMoneda,
  codigoIso4217: moneda.codigoIso4217,
  nombreMoneda: moneda.nombreMoneda,
  simboloMoneda: moneda.simboloMoneda,
  numeroDecimales: moneda.numeroDecimales,
  esMonedaBase: moneda.esMonedaBase,
  activo: moneda.activo,
  fechaCreacion: moneda.fechaCreacion,
  fechaModificacion: moneda.fechaModificacion,
});
