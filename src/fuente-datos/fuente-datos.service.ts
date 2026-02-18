import { Injectable } from '@nestjs/common';
import { CrearFuenteDatosUseCase } from './casos-de-uso/crear-fuente-datos.use-case';
import { ListarFuenteDatosUseCase } from './casos-de-uso/listar-fuente-datos.use-case';
import { ActualizarFuenteDatosUseCase } from './casos-de-uso/actualizar-fuente-datos.use-case';
import { EliminarFuenteDatosUseCase, EliminarFuenteDatosResponse } from './casos-de-uso/eliminar-fuente-datos.use-case';
import { FuenteDatosResponse } from './interfaces/fuente-datos-response.interface';
import { CrearFuenteDatosDto, ActualizarFuenteDatosDto } from './dtos';

@Injectable()
export class FuenteDatosService {
  constructor(
    private readonly crearUseCase: CrearFuenteDatosUseCase,
    private readonly listarUseCase: ListarFuenteDatosUseCase,
    private readonly actualizarUseCase: ActualizarFuenteDatosUseCase,
    private readonly eliminarUseCase: EliminarFuenteDatosUseCase,
  ) {}

  async crear(dto: CrearFuenteDatosDto): Promise<FuenteDatosResponse> {
    return this.crearUseCase.execute(dto);
  }

  async listarTodos(organizacionId?: string): Promise<FuenteDatosResponse[]> {
    return this.listarUseCase.execute(organizacionId);
  }

  async obtenerPorId(id: string): Promise<FuenteDatosResponse> {
    const resultado = await this.listarUseCase.execute();
    const encontrado = resultado.find((f) => f.id === id);
    if (!encontrado) {
      const { HttpException, HttpStatus } = await import('@nestjs/common');
      throw new HttpException({ description: 'Fuente de datos no encontrada' }, HttpStatus.NOT_FOUND);
    }
    return encontrado;
  }

  async actualizar(id: string, dto: ActualizarFuenteDatosDto): Promise<FuenteDatosResponse> {
    return this.actualizarUseCase.execute(id, dto);
  }

  async eliminar(id: string): Promise<EliminarFuenteDatosResponse> {
    return this.eliminarUseCase.execute(id);
  }
}
