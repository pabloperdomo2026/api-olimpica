import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { EjecucionProcesoRepository } from '../ejecucion-proceso.repository';
import { EstadoProcesoRepository } from '../../status-proceso/estado-proceso.repository';
import { ProcesoService } from '../../proceso/proceso.service';
import { CrearEjecucionProcesoDto } from '../dtos/crear-ejecucion-proceso.dto';
import { EjecucionProcesoResponse } from '../interfaces/ejecucion-proceso-response.interface';
import { ejecucionProcesoMapper } from '../mappers/ejecucion-proceso.mapper';
import { CrearFrameworkOrquestacionUseCase } from 'src/orquestacion/casos-de-uso';

@Injectable()
export class CrearEjecucionUseCase {
  constructor(
    private readonly ejecucionProcesoRepository: EjecucionProcesoRepository,
    private readonly estadoProcesoRepository: EstadoProcesoRepository,
    private readonly procesoService: ProcesoService,
    private readonly crearFrameworkOrquestacionUseCase: CrearFrameworkOrquestacionUseCase
  ) {}

  async execute(dto: CrearEjecucionProcesoDto): Promise<EjecucionProcesoResponse> {
    try {
      const proceso = await this.procesoService.obtenerPorId(dto.procesoId);

      const estados = await this.estadoProcesoRepository.listarTodos();
      const estadoInicial = estados.find((e) => e.esInicial);

      if (!estadoInicial) {
        throw new NotFoundException(
          'No se encontro un estado inicial configurado en smr_status_proceso',
        );
      }

      const response = await this.crearFrameworkOrquestacionUseCase.execute({stepFunctionName: ''})

      console.log('response:', response)
      const ahora = new Date();

      const ejecucionCreada = await this.ejecucionProcesoRepository.crear({
        procesoId: dto.procesoId,
        organizacionId: proceso.organizacionId,
        statusProcesoId: estadoInicial.id,
        fechaEjecucion: ahora,
        fechaHoraInicio: ahora,
        tipoEjecucion: dto.tipoEjecucion ?? 'MANUAL',
        usuarioSolicita: dto.usuarioSolicita,
        usuarioCreacion: dto.usuarioSolicita ?? 'sistema',
      });

      return ejecucionProcesoMapper(ejecucionCreada);
    } catch (error) {
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
