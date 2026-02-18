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
  esProcesoInicial: boolean;
  activo: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
  destinoId?: number;
  fuenteId?: number;
}
