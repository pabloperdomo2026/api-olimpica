import { TipoFuenteResponse } from '../interfaces/tipo-fuente-response.interface';
import { TipoFuenteEntity } from '../tipo-fuente.entity';

export const listarTipoFuentesMapper = (items: TipoFuenteEntity[]): TipoFuenteResponse[] => {
  return items.map((i) => tipoFuenteMapper(i));
};

export const tipoFuenteMapper = (i: TipoFuenteEntity): TipoFuenteResponse => ({
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
