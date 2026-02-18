import { FuncionesSistemaResponse } from '../interfaces/funciones-sistema-response.interface';
import { FuncionesSistemaEntity } from '../funciones-sistema.entity';

export const listarFuncionesSistemaMapper = (items: FuncionesSistemaEntity[]): FuncionesSistemaResponse[] => {
  return items.map((i) => funcionSistemaMapper(i));
};

export const funcionSistemaMapper = (i: FuncionesSistemaEntity): FuncionesSistemaResponse => ({
  id: i.id,
  codigo: i.codigo,
  nombre: i.nombre,
  descripcion: i.descripcion,
  activo: i.activo === 'S',
  fechaCreacion: i.fechaCreacion,
  fechaModificacion: i.fechaModificacion,
});
