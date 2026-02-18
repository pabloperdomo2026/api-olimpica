import { MensajeErrorResponse } from '../interfaces/mensaje-error-response.interface';
import { MensajeErrorEntity } from '../mensaje-error.entity';

export const listarMensajesErrorMapper = (items: MensajeErrorEntity[]): MensajeErrorResponse[] => {
  return items.map((i) => mensajeErrorMapper(i));
};

export const mensajeErrorMapper = (i: MensajeErrorEntity): MensajeErrorResponse => ({
  id: i.id,
  codigoError: i.codigoError,
  nombre: i.nombre,
  categoriaErrorId: i.categoriaErrorId,
  mensajePlantilla: i.mensajePlantilla,
  severidad: i.severidad,
  codigoHttpSugerido: i.codigoHttpSugerido,
  esRecuperable: i.esRecuperable,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
});
