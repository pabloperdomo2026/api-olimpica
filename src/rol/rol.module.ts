import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { RolRepository } from './rol.repository';
import { RolEntity } from './rol.entity';
import { CrearRolUseCase } from './casos-de-uso/crear-rol.use-case';
import { ListarRolesUseCase } from './casos-de-uso/listar-roles.use-case';
import { EditarRolUseCase } from './casos-de-uso/editar-rol.use-case';
import { EliminarRolUseCase } from './casos-de-uso/eliminar-rol.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity])],
  controllers: [RolController],
  providers: [
    RolService,
    RolRepository,
    CrearRolUseCase,
    ListarRolesUseCase,
    EditarRolUseCase,
    EliminarRolUseCase,
  ],
  exports: [RolService, RolRepository],
})
export class RolModule {}
