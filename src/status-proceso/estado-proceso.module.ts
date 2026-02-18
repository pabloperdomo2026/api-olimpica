import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoProcesoController } from './estado-proceso.controller';
import { EstadoProcesoService } from './estado-proceso.service';
import { EstadoProcesoRepository } from './estado-proceso.repository';
import { EstadoProcesoEntity } from './estado-proceso.entity';
import { CrearEstadoProcesoUseCase } from './casos-de-uso/crear-estado-proceso.use-case';
import { ListarEstadoProcesoUseCase } from './casos-de-uso/listar-estado-proceso.use-case';
import { ActualizarEstadoProcesoUseCase } from './casos-de-uso/actualizar-estado-proceso.use-case';
import { EliminarEstadoProcesoUseCase } from './casos-de-uso/eliminar-estado-proceso.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoProcesoEntity])],
  controllers: [EstadoProcesoController],
  providers: [
    EstadoProcesoService,
    EstadoProcesoRepository,
    CrearEstadoProcesoUseCase,
    ListarEstadoProcesoUseCase,
    ActualizarEstadoProcesoUseCase,
    EliminarEstadoProcesoUseCase,
  ],
  exports: [EstadoProcesoService, EstadoProcesoRepository],
})
export class EstadoProcesoModule {}
