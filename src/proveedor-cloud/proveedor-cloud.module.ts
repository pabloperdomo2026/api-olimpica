import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorCloudEntity } from './proveedor-cloud.entity';
import { ProveedorCloudController } from './proveedor-cloud.controller';
import { ProveedorCloudService } from './proveedor-cloud.service';
import { ProveedorCloudRepository } from './proveedor-cloud.repository';
import { CrearProveedorCloudUseCase } from './casos-de-uso/crear-proveedor-cloud.use-case';
import { ListarProveedoresCloudUseCase } from './casos-de-uso/listar-proveedores-cloud.use-case';
import { EditarProveedorCloudUseCase } from './casos-de-uso/editar-proveedor-cloud.use-case';
import { EliminarProveedorCloudUseCase } from './casos-de-uso/eliminar-proveedor-cloud.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProveedorCloudEntity])],
  controllers: [ProveedorCloudController],
  providers: [
    ProveedorCloudService,
    ProveedorCloudRepository,
    CrearProveedorCloudUseCase,
    ListarProveedoresCloudUseCase,
    EditarProveedorCloudUseCase,
    EliminarProveedorCloudUseCase,
  ],
  exports: [ProveedorCloudService, ProveedorCloudRepository],
})
export class ProveedorCloudModule {}
