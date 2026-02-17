import { ParametroGlobalResponse } from '../interfaces/parametro-global-response.interface';
import { ParametrosGlobalesEntity } from '../parametros-globales.entity';

export const listarParametrosMapper = (parametros: ParametrosGlobalesEntity[]): ParametroGlobalResponse[] => {
  return parametros.map((p) => parametroGlobalMapper(p));
};

export const parametroGlobalMapper = (p: ParametrosGlobalesEntity): ParametroGlobalResponse => ({
  organizacionId: p.organizacionId,
  organizacionNombre: p.organizacion?.nombreOrg,
  itemGrupo: p.itemGrupo,
  itemAtributo: p.itemAtributo,
  itemDescripcion: p.itemDescripcion,
  valorRetornar: p.valorRetornar,
  esDefecto: p.esDefecto,
  fechaCreacion: p.fechaCreacion,
  fechaModificacion: p.fechaModificacion,
});
