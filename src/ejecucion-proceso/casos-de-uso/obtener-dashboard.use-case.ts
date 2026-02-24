import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { DashboardResponse } from '../interfaces/dashboard-response.interface';

@Injectable()
export class ObtenerDashboardUseCase {
  constructor(private readonly repository: EjecucionProcesoRepository) {}

  async execute(): Promise<DashboardResponse> {
    try {
      const ejecuciones = await this.repository.listarHoy();

      let exitosasHoy = 0;
      let fallidasHoy = 0;
      let enProcesoHoy = 0;
      const procesosUnicos = new Set<string>();

      for (const e of ejecuciones) {
        if (e.statusProceso?.esExitoso) exitosasHoy++;
        else if (e.statusProceso?.esError) fallidasHoy++;
        else enProcesoHoy++;
        procesosUnicos.add(e.procesoId);
      }

      const totalHoy = ejecuciones.length;
      const completadas = exitosasHoy + fallidasHoy;
      const tasaExito =
        completadas > 0 ? Math.round((exitosasHoy / completadas) * 1000) / 10 : 0;

      // Ultimas 12 horas dinamicamente
      const ahora = new Date();
      const horas: number[] = [];
      for (let i = 11; i >= 0; i--) {
        horas.push((ahora.getHours() - i + 24) % 24);
      }
      const porHoraMap = new Map<number, { total: number; fallidas: number }>();
      horas.forEach((h) => porHoraMap.set(h, { total: 0, fallidas: 0 }));

      for (const e of ejecuciones) {
        const horaEj = new Date(e.fechaHoraInicio).getHours();
        if (porHoraMap.has(horaEj)) {
          const d = porHoraMap.get(horaEj)!;
          d.total++;
          if (e.statusProceso?.esError) d.fallidas++;
        }
      }

      const porHora = horas.map((h) => {
        const d = porHoraMap.get(h)!;
        return {
          hora: `${String(h).padStart(2, '0')}h`,
          total: d.total,
          fallidas: d.fallidas,
        };
      });

      // Ultimas 8 ejecuciones
      const ultimasEjecuciones = ejecuciones.slice(0, 8).map((e) => ({
        id: e.id,
        procesoCodigo: e.proceso?.codigo,
        procesoNombre: e.proceso?.nombre,
        estadoCodigo: e.statusProceso?.codigo,
        estadoNombre: e.statusProceso?.nombre,
        duracionSegundos: e.duracionSegundos ? Number(e.duracionSegundos) : undefined,
        fechaHoraInicio: e.fechaHoraInicio,
        fechaHoraFin: e.fechaHoraFin,
        esExitosa: e.statusProceso?.esExitoso ?? false,
        esFallida: e.statusProceso?.esError ?? false,
      }));

      // Procesos con fallas
      const falasPorProceso = new Map<
        string,
        { nombre?: string; codigo?: string; total: number; fallidas: number }
      >();
      for (const e of ejecuciones) {
        const key = e.procesoId;
        if (!falasPorProceso.has(key)) {
          falasPorProceso.set(key, {
            nombre: e.proceso?.nombre,
            codigo: e.proceso?.codigo,
            total: 0,
            fallidas: 0,
          });
        }
        const d = falasPorProceso.get(key)!;
        d.total++;
        if (e.statusProceso?.esError) d.fallidas++;
      }

      const procesosConFallas = Array.from(falasPorProceso.values())
        .filter((p) => p.fallidas > 0)
        .sort((a, b) => b.fallidas - a.fallidas)
        .slice(0, 5)
        .map((p) => ({
          procesoCodigo: p.codigo,
          procesoNombre: p.nombre,
          totalEjecuciones: p.total,
          ejecucionesFallidas: p.fallidas,
          porcentajeFallo: Math.round((p.fallidas / p.total) * 100),
        }));

      return {
        kpis: {
          totalHoy,
          exitosasHoy,
          fallidasHoy,
          enProcesoHoy,
          tasaExito,
          procesosActivos: procesosUnicos.size,
        },
        porHora,
        ultimasEjecuciones,
        procesosConFallas,
      };
    } catch (error) {
      throw new HttpException(
        { description: 'Error al obtener el dashboard', errorMessage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
