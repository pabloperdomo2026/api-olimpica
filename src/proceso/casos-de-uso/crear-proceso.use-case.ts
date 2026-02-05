import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { ProcesoResponse } from '../interfaces/proceso-response.interface';
import { Proceso } from '../interfaces/proceso.interface';
import { ProcesoRepository } from '../proceso.repository';
import { CrearProcesoDto } from '../dtos';
import { procesoMapper } from '../mappers/proceso.mapper';

@Injectable()
export class CrearProcesoUseCase {
  constructor(private readonly procesoRepository: ProcesoRepository) {}

  async execute(dto: CrearProcesoDto): Promise<ProcesoResponse> {
    try {
      const existeCodigo = await this.procesoRepository.obtenerPorCodigo(dto.codigo);

      if (existeCodigo) {
        throw new ConflictException(`El codigo ${dto.codigo} ya esta registrado`);
      }

      const nuevoProceso: Proceso = {
        organizacionId: dto.organizacionId,
        tipoProcesoId: dto.tipoProcesoId,
        nivelCriticidadId: dto.nivelCriticidadId,
        codigo: dto.codigo,
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        version: dto.version,
        idWorkflowCloud: dto.idWorkflowCloud,
        workflowSecret: dto.workflowSecret,
        parametrosJson: dto.parametrosJson,
        servicioCloudId: dto.servicioCloudId,
        esProcesoInicial: dto.esProcesoInicial || 'N',
        activo: 'S',
        fechaCreacion: new Date(),
        usuarioCreacion: 'admin@olimpica.com',
        destinoId: dto.destinoId,
        fuenteId: dto.fuenteId,
      };

      const procesoCreado = await this.procesoRepository.crear(nuevoProceso);

      return procesoMapper(procesoCreado);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al crear el proceso',
          errorMessage: error.response,
        },
        error.status || 500,
      );
    }
  }
}
