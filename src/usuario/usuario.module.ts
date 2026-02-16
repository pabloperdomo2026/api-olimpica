import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioUseCase } from './casos-de-uso/crear-usuario.use-case';
import { ListarUsuariosUseCase } from './casos-de-uso/listar-usuarios.use-case';
import { EditarUsuarioUseCase } from './casos-de-uso/editar-usuario.use-case';
import { EliminarUsuarioUseCase } from './casos-de-uso/eliminar-usuario.use-case';
import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { OrganizacionRepository } from 'src/organizacion/organizacion.repository';
import { OrganizacionEntity } from 'src/organizacion/organizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, OrganizacionEntity])],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    CrearUsuarioUseCase,
    ListarUsuariosUseCase,
    EditarUsuarioUseCase,
    EliminarUsuarioUseCase,
    UsuarioRepository,
    OrganizacionRepository
  ],
  exports: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
