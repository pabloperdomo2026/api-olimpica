import { RecipienteCorreoEntity } from '../recipiente-correo.entity';
import { RecipienteCorreoResponse } from '../interfaces/recipiente-correo-response.interface';

export function recipienteCorreoMapper(entidad: RecipienteCorreoEntity): RecipienteCorreoResponse {
  return {
    id: entidad.id,
    codigo: entidad.codigo,
    nombre: entidad.nombre,
    descripcion: entidad.descripcion ?? undefined,
    tipoRecipiente: entidad.tipoRecipiente ?? undefined,
    arnSns: entidad.arnSns ?? undefined,
    arnSqs: entidad.arnSqs ?? undefined,
    emailsDestino: entidad.emailsDestino ?? undefined,
    regionAws: entidad.regionAws ?? undefined,
    organizacionId: entidad.organizacionId,
    organizacionNombre: entidad.organizacion?.nombreOrg,
    activo: entidad.activo === 'S',
    fechaCreacion: entidad.fechaCreacion,
  };
}
