import { Injectable, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
import { ProcesoResponse } from '../interfaces/proceso-response.interface';
import { ProcesoRepository } from '../proceso.repository';
import { ActualizarProcesoDto } from '../dtos';
import { procesoMapper } from '../mappers/proceso.mapper';

@Injectable()
export class EditarProcesoUseCase {
  constructor(private readonly procesoRepository: ProcesoRepository) {}

  async execute(id: string, dto: ActualizarProcesoDto): Promise<ProcesoResponse> {
    try {
      const procesoExistente = await this.procesoRepository.obtenerPorId(id);

      if (!procesoExistente) {
        throw new NotFoundException(`Proceso con id ${id} no encontrado`);
      }

      const procesoActualizado = await this.procesoRepository.actualizar(id, {
        tipoProcesoId: dto.tipoProcesoId,
        nivelCriticidadId: dto.nivelCriticidadId,
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        version: dto.version,
        idWorkflowCloud: dto.idWorkflowCloud,
        workflowSecret: dto.workflowSecret,
        parametrosJson: dto.parametrosJson,
        servicioCloudId: dto.servicioCloudId,
        esProcesoInicial: dto.esProcesoInicial,
        activo: dto.activo,
        usuarioModificacion: 'admin@olimpica.com',
        destinoId: dto.destinoId,
        fuenteId: dto.fuenteId,
      });

      if (!procesoActualizado) {
        throw new BadRequestException('Proceso no existe');
      }

      return procesoMapper(procesoActualizado);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al editar el proceso',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
