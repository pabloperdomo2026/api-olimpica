import { ProcesoResponse } from '../interfaces/proceso-response.interface';
import { ProcesoEntity } from '../proceso.entity';

export const listarProcesosMapper = (procesos: ProcesoEntity[]): ProcesoResponse[] => {
  return procesos.map((proceso) => procesoMapper(proceso));
};

export const procesoMapper = (proceso: ProcesoEntity): ProcesoResponse => ({
  id: proceso.id,
  organizacionId: proceso.organizacionId,
  tipoProcesoId: proceso.tipoProcesoId,
  nivelCriticidadId: proceso.nivelCriticidadId,
  codigo: proceso.codigo,
  nombre: proceso.nombre,
  descripcion: proceso.descripcion,
  version: proceso.version,
  idWorkflowCloud: proceso.idWorkflowCloud,
  parametrosJson: proceso.parametrosJson,
  servicioCloudId: proceso.servicioCloudId,
  esProcesoInicial: proceso.esProcesoInicial,
  activo: proceso.activo,
  fechaCreacion: proceso.fechaCreacion,
  fechaModificacion: proceso.fechaModificacion,
  destinoId: proceso.destinoId,
  fuenteId: proceso.fuenteId,
});
