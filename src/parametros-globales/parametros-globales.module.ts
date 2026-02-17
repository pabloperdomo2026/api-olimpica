import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametrosGlobalesController } from './parametros-globales.controller';
import { ParametrosGlobalesService } from './parametros-globales.service';
import { ParametrosGlobalesRepository } from './parametros-globales.repository';
import { ParametrosGlobalesEntity } from './parametros-globales.entity';
import { CrearParametroGlobalUseCase } from './casos-de-uso/crear-parametro-global.use-case';
import { ListarParametrosGlobalesUseCase } from './casos-de-uso/listar-parametros-globales.use-case';
import { EditarParametroGlobalUseCase } from './casos-de-uso/editar-parametro-global.use-case';
import { EliminarParametroGlobalUseCase } from './casos-de-uso/eliminar-parametro-global.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ParametrosGlobalesEntity])],
  controllers: [ParametrosGlobalesController],
  providers: [
    ParametrosGlobalesService,
    ParametrosGlobalesRepository,
    CrearParametroGlobalUseCase,
    ListarParametrosGlobalesUseCase,
    EditarParametroGlobalUseCase,
    EliminarParametroGlobalUseCase,
  ],
  exports: [ParametrosGlobalesService, ParametrosGlobalesRepository],
})
export class ParametrosGlobalesModule {}
