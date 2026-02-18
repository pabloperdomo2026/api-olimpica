import { EstadoProcesoResponse } from '../interfaces/estado-proceso-response.interface';
import { EstadoProcesoEntity } from '../estado-proceso.entity';

export const listarEstadosProcesoMapper = (items: EstadoProcesoEntity[]): EstadoProcesoResponse[] => {
  return items.map((i) => estadoProcesoMapper(i));
};

export const estadoProcesoMapper = (i: EstadoProcesoEntity): EstadoProcesoResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  esInicial: i.esInicial,
  esFinal: i.esFinal,
  esExitoso: i.esExitoso,
  esError: i.esError,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
