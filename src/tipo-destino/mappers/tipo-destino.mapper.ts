import { TipoDestinoResponse } from '../interfaces/tipo-destino-response.interface';
import { TipoDestinoEntity } from '../tipo-destino.entity';

export const listarTipoDestinosMapper = (items: TipoDestinoEntity[]): TipoDestinoResponse[] => {
  return items.map((i) => tipoDestinoMapper(i));
};

export const tipoDestinoMapper = (i: TipoDestinoEntity): TipoDestinoResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  descripcion: i.descripcion,
  categoria: i.categoria,
  requiereCredenciales: i.requiereCredenciales,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
