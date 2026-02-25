import { ConfiguracionSlaEntity } from '../configuracion-sla.entity';
import { ConfiguracionSlaResponse } from '../interfaces/configuracion-sla-response.interface';

export function configuracionSlaMapper(entidad: ConfiguracionSlaEntity): ConfiguracionSlaResponse {
  return {
    id: entidad.id,
    procesoId: entidad.procesoId,
    procesoNombre: entidad.proceso?.nombre,
    procesoCodigo: entidad.proceso?.codigo,
    nombre: entidad.nombre,
    tiempoMaximoEjecucionMinutos: entidad.tiempoMaximoEjecucionMinutos ?? undefined,
    horaLimiteFinalizacion: entidad.horaLimiteFinalizacion ?? undefined,
    porcentajeRegistrosMinimo: entidad.porcentajeRegistrosMinimo ?? undefined,
    umbralErrorPorcentaje: entidad.umbralErrorPorcentaje ?? undefined,
    activo: entidad.activo === 'S',
    fechaCreacion: entidad.fechaCreacion,
    fechaModificacion: entidad.fechaModificacion ?? undefined,
  };
}
