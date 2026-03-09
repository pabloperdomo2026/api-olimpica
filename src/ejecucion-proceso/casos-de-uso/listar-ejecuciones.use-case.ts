import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { ConfiguracionSlaRepository } from '../../configuracion-sla/configuracion-sla.repository';
import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import {
  listarEjecucionesMapper,
  ejecucionProcesoMapper,
} from '../mappers/ejecucion-proceso.mapper';

@Injectable()
export class ListarEjecucionesUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly configuracionSlaRepository: ConfiguracionSlaRepository,
  ) {}

  async execute(procesoId?: string): Promise<EjecucionProcesoResponse[]> {
    try {
      const ejecuciones = procesoId
        ? await this.ejecucionProcesoRepository.listarPorProceso(procesoId)
        : await this.ejecucionProcesoRepository.listarTodos();

      const procesoIds = [...new Set(ejecuciones.map((e) => e.procesoId).filter(Boolean))];

      const slaMap = new Map<string, number>();
      await Promise.all(
        procesoIds.map(async (pid) => {
          const sla = await this.configuracionSlaRepository.obtenerPorProcesoId(pid);
          if (sla?.tiempoMaximoEjecucionMinutos) {
            slaMap.set(pid, sla.tiempoMaximoEjecucionMinutos * 60);
          }
        }),
      );

      return listarEjecucionesMapper(ejecuciones).map((e) => ({
        ...e,
        configuracionSlaSegundos: slaMap.get(e.procesoId) ?? undefined,
      }));
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener las ejecuciones',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }

  async executeById(id: string): Promise<EjecucionProcesoResponse> {
    try {
      const ejecucion = await this.ejecucionProcesoRepository.obtenerPorId(id);

      if (!ejecucion) {
        throw new NotFoundException(`Ejecucion con id ${id} no encontrada`);
      }

      const sla = await this.configuracionSlaRepository.obtenerPorProcesoId(ejecucion.procesoId);
      const configuracionSlaSegundos = sla?.tiempoMaximoEjecucionMinutos
        ? sla.tiempoMaximoEjecucionMinutos * 60
        : undefined;

      return {
        ...ejecucionProcesoMapper(ejecucion),
        configuracionSlaSegundos,
      };
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al obtener la ejecucion',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
