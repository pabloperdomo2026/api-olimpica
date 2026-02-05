import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizacionController } from './organizacion.controller';
import { OrganizacionService } from './organizacion.service';
import { OrganizacionRepository } from './organizacion.repository';
import { OrganizacionEntity } from './organizacion.entity';
import { CrearOrganizacionUseCase } from './casos-de-uso/crear-organizacion.use-case';
import { ListarOrganizacionesUseCase } from './casos-de-uso/listar-organizaciones.use-case';
import { EditarOrganizacionUseCase } from './casos-de-uso/editar-organizacion.use-case';
import { EliminarOrganizacionUseCase } from './casos-de-uso/eliminar-organizacion.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizacionEntity])],
  controllers: [OrganizacionController],
  providers: [
    OrganizacionService,
    OrganizacionRepository,
    CrearOrganizacionUseCase,
    ListarOrganizacionesUseCase,
    EditarOrganizacionUseCase,
    EliminarOrganizacionUseCase,
  ],
  exports: [OrganizacionService],
})
export class OrganizacionModule {}
