import { RolResponse } from '../interfaces/rol-response.interface';
import { RolEntity } from '../rol.entity';

export const listarRolesMapper = (roles: RolEntity[]): RolResponse[] => {
  return roles.map((rol) => rolMapper(rol));
};

export const rolMapper = (rol: RolEntity): RolResponse => ({
  id: rol.id,
  codigo: rol.codigo,
  nombre: rol.nombre,
  descripcion: rol.descripcion,
  activo: rol.activo,
  fechaCreacion: rol.fechaCreacion,
  fechaModificacion: rol.fechaModificacion,
});
