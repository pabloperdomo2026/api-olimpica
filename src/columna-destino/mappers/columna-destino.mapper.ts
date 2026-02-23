import { ColumnaDestinoResponse } from '../interfaces/columna-destino-response.interface';
import { ColumnaDestinoEntity } from '../columna-destino.entity';

export const listarColumnasDestinoMapper = (items: ColumnaDestinoEntity[]): ColumnaDestinoResponse[] => {
  return items.map((i) => columnaDestinoMapper(i));
};

export const columnaDestinoMapper = (i: ColumnaDestinoEntity): ColumnaDestinoResponse => ({
  id: i.id,
  tablaNombre: i.tablaNombre || undefined,
  nombreColumna: i.nombreColumna,
  destinoId: i.destinoId,
  tipoDatoId: i.tipoDatoId,
  posicionOrdinal: i.posicionOrdinal != null ? Number(i.posicionOrdinal) : undefined,
  esNullable: i.esNullable,
  esPii: i.esPii,
  obligaCase: i.obligaCase != null ? i.obligaCase : undefined,
  formatoEsperado: i.formatoEsperado || undefined,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion || undefined,
});
