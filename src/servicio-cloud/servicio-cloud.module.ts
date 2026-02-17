import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioCloudEntity } from './servicio-cloud.entity';
import { ServicioCloudController } from './servicio-cloud.controller';
import { ServicioCloudService } from './servicio-cloud.service';
import { ServicioCloudRepository } from './servicio-cloud.repository';
import { CrearServicioCloudUseCase } from './casos-de-uso/crear-servicio-cloud.use-case';
import { ListarServiciosCloudUseCase } from './casos-de-uso/listar-servicios-cloud.use-case';
import { EditarServicioCloudUseCase } from './casos-de-uso/editar-servicio-cloud.use-case';
import { EliminarServicioCloudUseCase } from './casos-de-uso/eliminar-servicio-cloud.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioCloudEntity])],
  controllers: [ServicioCloudController],
  providers: [
    ServicioCloudService,
    ServicioCloudRepository,
    CrearServicioCloudUseCase,
    ListarServiciosCloudUseCase,
    EditarServicioCloudUseCase,
    EliminarServicioCloudUseCase,
  ],
  exports: [ServicioCloudService, ServicioCloudRepository],
})
export class ServicioCloudModule {}
