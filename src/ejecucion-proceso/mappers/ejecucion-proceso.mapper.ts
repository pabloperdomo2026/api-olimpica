import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import { EjecucionProcesoEntity } from '../ejecucion-proceso.entity';

export const listarEjecucionesMapper = (
  ejecuciones: EjecucionProcesoEntity[],
): EjecucionProcesoResponse[] => {
  return ejecuciones.map((e) => ejecucionProcesoMapper(e));
};

export const ejecucionProcesoMapper = (
  ejecucion: EjecucionProcesoEntity,
): EjecucionProcesoResponse => ({
  id: ejecucion.id,
  organizacionId: ejecucion.organizacionId,
  procesoId: ejecucion.procesoId,
  procesoNombre: ejecucion.proceso?.nombre,
  procesoCodigo: ejecucion.proceso?.codigo,
  statusProcesoId: ejecucion.statusProcesoId,
  estadoNombre: ejecucion.statusProceso?.nombre,
  estadoCodigo: ejecucion.statusProceso?.codigo,
  fechaEjecucion: ejecucion.fechaEjecucion,
  fechaHoraInicio: ejecucion.fechaHoraInicio,
  fechaHoraFin: ejecucion.fechaHoraFin,
  tipoEjecucion: ejecucion.tipoEjecucion,
  numeroRegistrosProcesados: ejecucion.numeroRegistrosProcesados,
  numeroRegistrosExitosos: ejecucion.numeroRegistrosExitosos,
  numeroRegistrosFallidos: ejecucion.numeroRegistrosFallidos,
  duracionSegundos: ejecucion.duracionSegundos,
  usuarioSolicita: ejecucion.usuarioSolicita,
  fechaCreacion: ejecucion.fechaCreacion,
  fechaModificacion: ejecucion.fechaModificacion,
});
