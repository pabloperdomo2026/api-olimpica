import { PermisoResponse } from '../interfaces/permiso-response.interface';
import { PermisoEntity } from '../permiso.entity';

export const listarPermisosMapper = (permisos: PermisoEntity[]): PermisoResponse[] => {
  return permisos.map((permiso) => permisoMapper(permiso));
};

export const permisoMapper = (permiso: PermisoEntity): PermisoResponse => ({
  id: permiso.id,
  codigo: permiso.codigo,
  nombre: permiso.nombre,
  descripcion: permiso.descripcion,
  activo: permiso.activo,
  fechaCreacion: permiso.fechaCreacion,
  fechaModificacion: permiso.fechaModificacion,
});
