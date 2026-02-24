export interface RecipienteCorreoResponse {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  tipoRecipiente?: string;
  arnSns?: string;
  arnSqs?: string;
  emailsDestino?: string;
  regionAws?: string;
  organizacionId: string;
  organizacionNombre?: string;
  activo: boolean;
  fechaCreacion: Date;
}
