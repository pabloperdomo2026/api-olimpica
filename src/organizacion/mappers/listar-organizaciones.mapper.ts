import { OrganizacionResponse } from '../interfaces/organizacion-response.interface';
import { OrganizacionEntity } from '../organizacion.entity';

export const listarOrganizacionesMapper = (organizaciones: OrganizacionEntity[]): OrganizacionResponse[] => {
  return organizaciones.map((org) => ({
    id: org.id,
    codigoOrg: org.codigoOrg,
    nombreOrg: org.nombreOrg,
    razonSocial: org.razonSocial,
    nit: org.nit,
    pais: org.pais,
    ciudad: org.ciudad,
    direccion: org.direccion,
    telefonoContacto: org.telefonoContacto,
    emailContacto: org.emailContacto,
    activo: org.activo,
    fechaCreacion: org.fechaCreacion,
    fechaModificacion: org.fechaModificacion,
  }));
};

export const organizacionMapper = (org: OrganizacionEntity): OrganizacionResponse => ({
  id: org.id,
  codigoOrg: org.codigoOrg,
  nombreOrg: org.nombreOrg,
  razonSocial: org.razonSocial,
  nit: org.nit,
  pais: org.pais,
  ciudad: org.ciudad,
  direccion: org.direccion,
  telefonoContacto: org.telefonoContacto,
  emailContacto: org.emailContacto,
  activo: org.activo,
  fechaCreacion: org.fechaCreacion,
  fechaModificacion: org.fechaModificacion,
});
