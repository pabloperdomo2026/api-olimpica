export interface ParametroGlobalResponse {
  organizacionId: string;
  organizacionNombre?: string;
  itemGrupo: string;
  itemAtributo: string;
  itemDescripcion: string;
  valorRetornar: string;
  esDefecto: boolean;
  fechaCreacion: Date;
  fechaModificacion?: Date;
}
