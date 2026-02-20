import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjecucionProcesoController } from './ejecucion-proceso.controller';
import { EjecucionProcesoService } from './ejecucion-proceso.service';
import { EjecucionProcesoRepository } from './ejecucion-proceso.repository';
import { EjecucionProcesoEntity } from './ejecucion-proceso.entity';
import { ListarEjecucionesUseCase } from './casos-de-uso/listar-ejecuciones.use-case';
import { CrearEjecucionUseCase } from './casos-de-uso/crear-ejecucion.use-case';
import { EstadoProcesoModule } from '../status-proceso/estado-proceso.module';
import { ProcesoModule } from '../proceso/proceso.module';
import { OrquestacionModule } from 'src/orquestacion/orquestacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EjecucionProcesoEntity]),
    EstadoProcesoModule,
    ProcesoModule,
    OrquestacionModule
  ],
  controllers: [EjecucionProcesoController],
  providers: [
    EjecucionProcesoService,
    EjecucionProcesoRepository,
    ListarEjecucionesUseCase,
    CrearEjecucionUseCase,
  ],
  exports: [EjecucionProcesoService],
})
export class EjecucionProcesoModule {}
