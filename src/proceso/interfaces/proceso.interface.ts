export interface Proceso {
  id?: string;
  organizacionId: string;
  tipoProcesoId: number;
  nivelCriticidadId: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  version?: string;
  idWorkflowCloud?: string;
  workflowSecret?: string;
  parametrosJson?: string;
  servicioCloudId?: number;
  esProcesoInicial: string;
  activo: string;
  fechaCreacion: Date;
  usuarioCreacion?: string;
  fechaModificacion?: Date;
  usuarioModificacion?: string;
  destinoId?: number;
  fuenteId?: number;
}
