import { DestinoDatosResponse } from '../interfaces/destino-datos-response.interface';
import { DestinoDatosEntity } from '../destino-datos.entity';

export const listarDestinoDatosMapper = (items: DestinoDatosEntity[]): DestinoDatosResponse[] => {
  return items.map((i) => destinoDatosMapper(i));
};

export const destinoDatosMapper = (i: DestinoDatosEntity): DestinoDatosResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  tipoDestino: i.tipoDestino || undefined,
  endpointApi: i.endpointApi || undefined,
  tamanoLoteRegistros: Number(i.tamanoLoteRegistros),
  tipoDestinoId: i.tipoDestinoId,
  organizacionId: i.organizacionId,
  tiempoRetencion: i.tiempoRetencion,
  parametrosJson: i.parametrosJson || undefined,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion || undefined,
});
