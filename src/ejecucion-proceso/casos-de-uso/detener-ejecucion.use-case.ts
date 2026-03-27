import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EstadoProcesoRepository } from '../../status-proceso/estado-proceso.repository';
import { ProcesoService } from '../../proceso/proceso.service';
import { DetenerFrameworkOrquestacionUseCase } from 'src/orquestacion/casos-de-uso/detener-framework-orquestacion.use-case';

@Injectable()
export class DetenerEjecucionUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly estadoProcesoRepository: EstadoProcesoRepository,
    private readonly procesoService: ProcesoService,
    private readonly detenerFrameworkOrquestacionUseCase: DetenerFrameworkOrquestacionUseCase
  ) {}

  async execute(id: string): Promise<any> {
    try {
      const procesoEjecucion = await this.ejecucionProcesoRepository.obtenerPorId(id)

      if (!procesoEjecucion?.procesoId) {
        throw new Error('No existe proceso');
      }

      const proceso = await this.procesoService.obtenerPorId(procesoEjecucion.procesoId);

      const estados = await this.estadoProcesoRepository.listarTodos();
      const estado = estados.find((e) => e.esFinal);

      if (!estado) {
        throw new NotFoundException(
          'No se encontro un estado inicial configurado en smr_status_proceso',
        );
      }

      const ahora = new Date();

      const ejecucionFinalizada = await this.ejecucionProcesoRepository.actualizar(id, {
        statusProcesoId: estado.id,
        fechaHoraInicio: ahora,
      });

      await this.detenerFrameworkOrquestacionUseCase.execute({
        idWorkflowCloud: proceso.idWorkflowCloud
      })      

      return {
        message: 'Ejecucion detenida'
      }
    } catch (error) {
      console.log('error', error)
      throw new HttpException(
        {
          description: 'Error al crear la ejecucion',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
