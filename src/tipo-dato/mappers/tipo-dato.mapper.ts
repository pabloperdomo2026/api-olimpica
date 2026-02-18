import { TipoDatoResponse } from '../interfaces/tipo-dato-response.interface';
import { TipoDatoEntity } from '../tipo-dato.entity';

export const listarTipoDatosMapper = (items: TipoDatoEntity[]): TipoDatoResponse[] => {
  return items.map((i) => tipoDatoMapper(i));
};

export const tipoDatoMapper = (i: TipoDatoEntity): TipoDatoResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  tipoSql: i.tipoSql,
  tipoPython: i.tipoPython,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
