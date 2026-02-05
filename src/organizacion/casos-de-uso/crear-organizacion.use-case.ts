import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { OrganizacionResponse } from '../interfaces/organizacion-response.interface';
import { OrganizacionRepository } from '../organizacion.repository';
import { CrearOrganizacionDto } from '../dtos';
import { organizacionMapper } from '../mappers/listar-organizaciones.mapper';

@Injectable()
export class CrearOrganizacionUseCase {
  constructor(private readonly organizacionRepository: OrganizacionRepository) {}

  async execute(dto: CrearOrganizacionDto): Promise<OrganizacionResponse> {
    try {
      // Validar codigo unico
      const existeCodigo = await this.organizacionRepository.obtenerPorCodigo(dto.codigoOrg);
      if (existeCodigo) {
        throw new ConflictException(`El codigo ${dto.codigoOrg} ya esta registrado`);
      }

      // Validar NIT unico
      const existeNit = await this.organizacionRepository.obtenerPorNit(dto.nit);
      if (existeNit) {
        throw new ConflictException(`El NIT ${dto.nit} ya esta registrado`);
      }

      const organizacion = await this.organizacionRepository.crear({
        codigoOrg: dto.codigoOrg,
        nombreOrg: dto.nombreOrg,
        razonSocial: dto.razonSocial,
        nit: dto.nit,
        pais: dto.pais,
        ciudad: dto.ciudad,
        direccion: dto.direccion,
        telefonoContacto: dto.telefonoContacto,
        emailContacto: dto.emailContacto,
        activo: 'S',
        fechaCreacion: new Date(),
        perteneceA: dto.perteneceA,
      });

      return organizacionMapper(organizacion);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new HttpException(
        {
          description: 'Error al crear la organizacion',
          errorMessage: error.message,
        },
        error.status || 500,
      );
    }
  }
}
