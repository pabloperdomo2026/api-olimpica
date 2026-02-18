import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcesoMapeoCampoController } from './proceso-mapeo-campo.controller';
import { ProcesoMapeoCampoService } from './proceso-mapeo-campo.service';
import { ProcesoMapeoCampoRepository } from './proceso-mapeo-campo.repository';
import { ProcesoMapeoCampoEntity } from './proceso-mapeo-campo.entity';
import { CrearProcesoMapeoCampoUseCase } from './casos-de-uso/crear-proceso-mapeo-campo.use-case';
import { ListarProcesoMapeoCampoUseCase } from './casos-de-uso/listar-proceso-mapeo-campo.use-case';
import { ActualizarProcesoMapeoCampoUseCase } from './casos-de-uso/actualizar-proceso-mapeo-campo.use-case';
import { EliminarProcesoMapeoCampoUseCase } from './casos-de-uso/eliminar-proceso-mapeo-campo.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProcesoMapeoCampoEntity])],
  controllers: [ProcesoMapeoCampoController],
  providers: [
    ProcesoMapeoCampoService,
    ProcesoMapeoCampoRepository,
    CrearProcesoMapeoCampoUseCase,
    ListarProcesoMapeoCampoUseCase,
    ActualizarProcesoMapeoCampoUseCase,
    EliminarProcesoMapeoCampoUseCase,
  ],
  exports: [ProcesoMapeoCampoService, ProcesoMapeoCampoRepository],
})
export class ProcesoMapeoCampoModule {}
