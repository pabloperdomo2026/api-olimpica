export interface ProcesoResponse {
  id: string;
  organizacionId: string;
  tipoProcesoId: number;
  nivelCriticidadId: number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  version?: string;
  idWorkflowCloud?: string;
  parametrosJson?: string;
  servicioCloudId?: number;
  esProcesoInicial: string;
  activo: string;
  fechaCreacion: Date;
  fechaModificacion?: Date;
  destinoId?: number;
  fuenteId?: number;
}
