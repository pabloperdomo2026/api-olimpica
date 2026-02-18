import { NivelCriticidadResponse } from '../interfaces/nivel-criticidad-response.interface';
import { NivelCriticidadEntity } from '../nivel-criticidad.entity';

export const listarNivelesCriticidadMapper = (items: NivelCriticidadEntity[]): NivelCriticidadResponse[] => {
  return items.map((i) => nivelCriticidadMapper(i));
};

export const nivelCriticidadMapper = (i: NivelCriticidadEntity): NivelCriticidadResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  nivelNumerico: Number(i.nivelNumerico),
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
