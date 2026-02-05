import { Injectable, ConflictException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';
import { CrearUsuarioDto } from '../dtos';
import { UsuarioRepository } from '../usuario.repository';
import { crearUsuarioMapper } from '../mappers/crear-usuario.mapper';

@Injectable()
export class CrearUsuarioUseCase {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(dto: CrearUsuarioDto): Promise<UsuarioResponse> {
    try {
      const existeEmail = await this.usuarioRepository.obtenerPorEmail(dto.email);

      if (existeEmail) {
        throw new ConflictException(`El email ${dto.email} ya está registrado`);
      }

      const passwordHash = `$2b$10$${Buffer.from(dto.password).toString('base64')}`;

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
