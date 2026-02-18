export interface MensajeErrorResponse {
  id: string;
  codigoError: string;
  nombre: string;
  categoriaErrorId: number;
  mensajePlantilla: string;
  severidad: string;
  codigoHttpSugerido: number;
  esRecuperable: boolean;
  activo: boolean;
  fechaCreacion: Date;
}
