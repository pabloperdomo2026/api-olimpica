import { TipoAlertaResponse } from '../interfaces/tipo-alerta-response.interface';
import { TipoAlertaEntity } from '../tipo-alerta.entity';

export const listarTipoAlertasMapper = (items: TipoAlertaEntity[]): TipoAlertaResponse[] => {
  return items.map((i) => tipoAlertaMapper(i));
};

export const tipoAlertaMapper = (i: TipoAlertaEntity): TipoAlertaResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  severidad: i.severidad,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
