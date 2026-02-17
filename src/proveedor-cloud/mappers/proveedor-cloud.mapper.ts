import { ProveedorCloudEntity } from '../proveedor-cloud.entity';
import { ProveedorCloudResponse } from '../interfaces/proveedor-cloud-response.interface';

export const proveedorCloudMapper = (entity: ProveedorCloudEntity): ProveedorCloudResponse => ({
  id: entity.id,
  codigo: entity.codigo,
  nombre: entity.nombre,
  urlBase: entity.urlBase,
  activo: entity.activo,
  fechaCreacion: entity.fechaCreacion,
  fechaModificacion: entity.fechaModificacion,
});

export const listarProveedoresCloudMapper = (entities: ProveedorCloudEntity[]): ProveedorCloudResponse[] => {
  return entities.map(proveedorCloudMapper);
};
