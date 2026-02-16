import { Injectable, ConflictException, InternalServerErrorException, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';
import { CrearUsuarioDto } from '../dtos';
import { UsuarioRepository } from '../usuario.repository';
import { crearUsuarioMapper } from '../mappers/crear-usuario.mapper';
import { OrganizacionRepository } from 'src/organizacion/organizacion.repository';

@Injectable()
export class CrearUsuarioUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly organizacionRepository: OrganizacionRepository
  ) {}

  async execute(dto: CrearUsuarioDto): Promise<UsuarioResponse> {
    try {
      const existeEmail = await this.usuarioRepository.obtenerPorEmail(dto.email);

      if (existeEmail) {
        throw new ConflictException(`El email ${dto.email} ya está registrado`);
      }

      const organizacion = await this.organizacionRepository.obtenerPorId(dto.organizacionId);

      if (!organizacion) {
        throw new ConflictException(`La organizacion ${dto.organizacionId} no está registrada`);
      }

      const passwordHash = await bcrypt.hash(dto.password, 10);

      const nuevoUsuario: Usuario = {
        organizacionId: dto.organizacionId,
        email: dto.email,
        passwordHash,
        nombre: dto.nombre,
        apellido: dto?.apellido,
        activo: true,
        fechaCreacion: new Date(),
        usuarioCreacion: 'admin@olimpica.com',
      };

      const usuarioCreado = await this.usuarioRepository.crear(nuevoUsuario);

      return crearUsuarioMapper(usuarioCreado);
    } catch (error) {
      throw new HttpException(
        {
          description: 'Error al crear un usuario',
          errorMessage: error.response
        },
        error.status
      )
    }
  }
}
