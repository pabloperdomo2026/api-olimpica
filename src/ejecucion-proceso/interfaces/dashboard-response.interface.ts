export interface DashboardResponse {
  kpis: {
    totalHoy: number;
    exitosasHoy: number;
    fallidasHoy: number;
    enProcesoHoy: number;
    tasaExito: number;
    procesosActivos: number;
  };
  porHora: {
    hora: string;
    total: number;
    fallidas: number;
  }[];
  ultimasEjecuciones: {
    id: string;
    procesoCodigo?: string;
    procesoNombre?: string;
    estadoCodigo?: string;
    estadoNombre?: string;
    duracionSegundos?: number;
    fechaHoraInicio: Date;
    fechaHoraFin?: Date;
    esExitosa: boolean;
    esFallida: boolean;
  }[];
  procesosConFallas: {
    procesoCodigo?: string;
    procesoNombre?: string;
    totalEjecuciones: number;
    ejecucionesFallidas: number;
    porcentajeFallo: number;
  }[];
}
