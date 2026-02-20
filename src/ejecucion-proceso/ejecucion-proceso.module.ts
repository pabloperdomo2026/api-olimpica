import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjecucionProcesoController } from './ejecucion-proceso.controller';
import { EjecucionProcesoService } from './ejecucion-proceso.service';
import { EjecucionProcesoRepository } from './ejecucion-proceso.repository';
import { EjecucionProcesoEntity } from './ejecucion-proceso.entity';
import { ListarEjecucionesUseCase } from './casos-de-uso/listar-ejecuciones.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([EjecucionProcesoEntity])],
  controllers: [EjecucionProcesoController],
  providers: [
    EjecucionProcesoService,
    EjecucionProcesoRepository,
    ListarEjecucionesUseCase,
  ],
  exports: [EjecucionProcesoService],
})
export class EjecucionProcesoModule {}
