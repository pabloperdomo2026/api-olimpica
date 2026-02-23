import { ProgramacionEntity } from '../programacion.entity';
import { ProgramacionResponse } from '../interfaces/programacion-response.interface';

export function programacionMapper(entidad: ProgramacionEntity): ProgramacionResponse {
  return {
    id: entidad.id,
    nombre: entidad.nombre,
    expresionCron: entidad.expresionCron ?? null,
    frecuenciaMinutos: entidad.frecuenciaMinutos ?? null,
    activo: entidad.activo,
    proceso: entidad.proceso
      ? { id: entidad.proceso.id, nombre: entidad.proceso.nombre, codigo: entidad.proceso.codigo }
      : null,
    tipoProgramacion: entidad.tipoProgramacion
      ? { id: entidad.tipoProgramacion.id, nombre: entidad.tipoProgramacion.nombre }
      : null,
    fechaCreacion: entidad.fechaCreacion,
    fechaModificacion: entidad.fechaModificacion,
  };
}
