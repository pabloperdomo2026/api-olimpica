import { ProcesoMapeoCampoEntity } from '../proceso-mapeo-campo.entity';
import { ProcesoMapeoCampoResponse } from '../interfaces/proceso-mapeo-campo-response.interface';

export function procesoMapeoCampoMapper(entity: ProcesoMapeoCampoEntity): ProcesoMapeoCampoResponse {
  return {
    id: entity.id,
    nombreColumna: entity.nombreColumna,
    secuenciaGeneracionTabular: entity.secuenciaGeneracionTabular ?? undefined,
    posicionOrdinal: entity.posicionOrdinal != null ? Number(entity.posicionOrdinal) : undefined,
    esNullable: entity.esNullable,
    esPii: entity.esPii,
    nombreCampoOrigen: entity.nombreCampoOrigen ?? undefined,
    nombreCampoDestino: entity.nombreCampoDestino,
    destinoObligaCase: entity.destinoObligaCase ?? undefined,
    formatoOrigen: entity.formatoOrigen ?? undefined,
    formatoDestino: entity.formatoDestino ?? undefined,
    tipoExpresion: entity.tipoExpresion,
    expresionTransformacion: entity.expresionTransformacion ?? undefined,
    columnaDestinoId: entity.columnaDestinoId,
    columnaOrigenId: entity.columnaOrigenId,
    procesoId: entity.procesoId,
    activo: entity.activo === 'S',
    fechaCreacion: entity.fechaCreacion?.toISOString(),
    fechaModificacion: entity.fechaModificacion?.toISOString(),
  };
}
