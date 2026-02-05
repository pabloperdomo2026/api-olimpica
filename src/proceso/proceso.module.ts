import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcesoController } from './proceso.controller';
import { ProcesoService } from './proceso.service';
import { ProcesoRepository } from './proceso.repository';
import { ProcesoEntity } from './proceso.entity';
import { CrearProcesoUseCase } from './casos-de-uso/crear-proceso.use-case';
import { ListarProcesosUseCase } from './casos-de-uso/listar-procesos.use-case';
import { EditarProcesoUseCase } from './casos-de-uso/editar-proceso.use-case';
import { EliminarProcesoUseCase } from './casos-de-uso/eliminar-proceso.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProcesoEntity])],
  controllers: [ProcesoController],
  providers: [
    ProcesoService,
    ProcesoRepository,
    CrearProcesoUseCase,
    ListarProcesosUseCase,
    EditarProcesoUseCase,
    EliminarProcesoUseCase,
  ],
  exports: [ProcesoService],
})
export class ProcesoModule {}
