import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoController } from './permiso.controller';
import { PermisoService } from './permiso.service';
import { PermisoRepository } from './permiso.repository';
import { PermisoEntity } from './permiso.entity';
import { CrearPermisoUseCase } from './casos-de-uso/crear-permiso.use-case';
import { ListarPermisosUseCase } from './casos-de-uso/listar-permisos.use-case';
import { EditarPermisoUseCase } from './casos-de-uso/editar-permiso.use-case';
import { EliminarPermisoUseCase } from './casos-de-uso/eliminar-permiso.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PermisoEntity])],
  controllers: [PermisoController],
  providers: [
    PermisoService,
    PermisoRepository,
    CrearPermisoUseCase,
    ListarPermisosUseCase,
    EditarPermisoUseCase,
    EliminarPermisoUseCase,
  ],
  exports: [PermisoService],
})
export class PermisoModule {}
