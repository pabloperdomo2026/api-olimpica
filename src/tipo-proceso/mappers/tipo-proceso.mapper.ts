import { TipoProcesoResponse } from '../interfaces/tipo-proceso-response.interface';
import { TipoProcesoEntity } from '../tipo-proceso.entity';

export const listarTipoProcesosMapper = (items: TipoProcesoEntity[]): TipoProcesoResponse[] => {
  return items.map((i) => tipoProcesoMapper(i));
};

export const tipoProcesoMapper = (i: TipoProcesoEntity): TipoProcesoResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  descripcion: i.descripcion,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
