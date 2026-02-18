import { TipoProgramacionResponse } from '../interfaces/tipo-programacion-response.interface';
import { TipoProgramacionEntity } from '../tipo-programacion.entity';

export const listarTipoProgramacionesMapper = (items: TipoProgramacionEntity[]): TipoProgramacionResponse[] => {
  return items.map((i) => tipoProgramacionMapper(i));
};

export const tipoProgramacionMapper = (i: TipoProgramacionEntity): TipoProgramacionResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  requiereCron: i.requiereCron,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
