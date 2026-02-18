import { FuenteDatosEntity } from '../fuente-datos.entity';
import { FuenteDatosResponse } from '../interfaces/fuente-datos-response.interface';

export function fuenteDatosMapper(instancia: FuenteDatosEntity): FuenteDatosResponse {
  return {
    id: instancia.id,
    tipoFuenteId: instancia.tipoFuenteId,
    codigo: instancia.codigo,
    nombre: instancia.nombre,
    host: instancia.host ?? null,
    puerto: instancia.puerto != null ? Number(instancia.puerto) : null,
    nombreBaseDatos: instancia.nombreBaseDatos ?? null,
    usuario: instancia.usuario ?? null,
    parametrosJson: instancia.parametrosJson ?? null,
    tiempoRetencion: Number(instancia.tiempoRetencion),
    organizacionId: instancia.organizacionId,
    activo: instancia.activo === 'S',
    fechaCreacion: instancia.fechaCreacion,
    fechaModificacion: instancia.fechaModificacion,
  };
}
