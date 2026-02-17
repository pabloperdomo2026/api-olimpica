import { ServicioCloudEntity } from '../servicio-cloud.entity';
import { ServicioCloudResponse } from '../interfaces/servicio-cloud-response.interface';

export const servicioCloudMapper = (entity: ServicioCloudEntity): ServicioCloudResponse => ({
  id: entity.id,
  proveedorCloudId: entity.proveedorCloudId,
  proveedorCloudNombre: entity.proveedorCloud?.nombre,
  region: entity.region,
  cloudAccount: entity.cloudAccount,
  tipoServicio: entity.tipoServicio,
  nombreServicio: entity.nombreServicio,
  uriRecurso: entity.uriRecurso,
  parametrosJson: entity.parametrosJson,
  permiteInicio: entity.permiteInicio,
  permiteDetener: entity.permiteDetener,
  activo: entity.activo,
  organizacionId: entity.organizacionId,
  fechaCreacion: entity.fechaCreacion,
  fechaModificacion: entity.fechaModificacion,
});

export const listarServiciosCloudMapper = (entities: ServicioCloudEntity[]): ServicioCloudResponse[] => {
  return entities.map(servicioCloudMapper);
};
