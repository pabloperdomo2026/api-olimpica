import { PuntoVentaResponse } from '../interfaces/punto-venta-response.interface';
import { PuntoVentaEntity } from '../punto-venta.entity';

export const listarPuntosVentaMapper = (puntosVenta: PuntoVentaEntity[]): PuntoVentaResponse[] => {
  return puntosVenta.map((pv) => puntoVentaMapper(pv));
};

export const puntoVentaMapper = (pv: PuntoVentaEntity): PuntoVentaResponse => ({
  id: pv.id,
  organizacionId: pv.organizacionId,
  codigoTienda: pv.codigoTienda,
  nombreTienda: pv.nombreTienda,
  ciudad: pv.ciudad,
  direccion: pv.direccion,
  activo: pv.activo,
  fechaCreacion: pv.fechaCreacion,
  fechaModificacion: pv.fechaModificacion,
});
