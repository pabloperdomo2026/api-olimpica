import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProcesoController } from './tipo-proceso.controller';
import { TipoProcesoService } from './tipo-proceso.service';
import { TipoProcesoRepository } from './tipo-proceso.repository';
import { TipoProcesoEntity } from './tipo-proceso.entity';
import { CrearTipoProcesoUseCase } from './casos-de-uso/crear-tipo-proceso.use-case';
import { ListarTipoProcesoUseCase } from './casos-de-uso/listar-tipo-proceso.use-case';
import { ActualizarTipoProcesoUseCase } from './casos-de-uso/actualizar-tipo-proceso.use-case';
import { EliminarTipoProcesoUseCase } from './casos-de-uso/eliminar-tipo-proceso.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProcesoEntity])],
  controllers: [TipoProcesoController],
  providers: [
    TipoProcesoService,
    TipoProcesoRepository,
    CrearTipoProcesoUseCase,
    ListarTipoProcesoUseCase,
    ActualizarTipoProcesoUseCase,
    EliminarTipoProcesoUseCase,
  ],
  exports: [TipoProcesoService, TipoProcesoRepository],
})
export class TipoProcesoModule {}
