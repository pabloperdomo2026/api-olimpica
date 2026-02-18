import { ColumnaOrigenEntity } from '../columna-origen.entity';
import { ColumnaOrigenResponse } from '../interfaces/columna-origen-response.interface';

export function columnaOrigenMapper(instancia: ColumnaOrigenEntity): ColumnaOrigenResponse {
  return {
    id: instancia.id,
    fuenteId: instancia.fuenteId,
    tipoDatoId: instancia.tipoDatoId,
    nombreColumna: instancia.nombreColumna,
    posicionOrdinal: instancia.posicionOrdinal != null ? Number(instancia.posicionOrdinal) : null,
    esNullable: instancia.esNullable,
    esPii: instancia.esPii,
    obligaCase: instancia.obligaCase ?? null,
    formatoEsperado: instancia.formatoEsperado ?? null,
    activo: instancia.activo === 'S',
    fechaCreacion: instancia.fechaCreacion,
    fechaModificacion: instancia.fechaModificacion,
  };
}
