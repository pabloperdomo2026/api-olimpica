import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjecucionProcesoController } from './ejecucion-proceso.controller';
import { EjecucionProcesoService } from './ejecucion-proceso.service';
import { EjecucionProcesoRepository } from './ejecucion-proceso.repository';
import { EjecucionProcesoEntity } from './ejecucion-proceso.entity';
import { ListarEjecucionesUseCase } from './casos-de-uso/listar-ejecuciones.use-case';
import { CrearEjecucionUseCase } from './casos-de-uso/crear-ejecucion.use-case';
import { CrearEventoEjecucionUseCase } from './casos-de-uso/crear-evento-ejecucion.use-case';
import { FinalizarEventoEjecucionUseCase } from './casos-de-uso/finalizar-evento-ejecucion.use-case';
import { ObtenerDashboardUseCase } from './casos-de-uso/obtener-dashboard.use-case';
import { EstadoProcesoModule } from '../status-proceso/estado-proceso.module';
import { ProcesoModule } from '../proceso/proceso.module';
import { OrquestacionModule } from 'src/orquestacion/orquestacion.module';
import { ParametrosGlobalesEntity } from 'src/parametros-globales/parametros-globales.entity';
import { ParametrosGlobalesRepository } from 'src/parametros-globales/parametros-globales.repository';
import { OrganizacionRepository } from 'src/organizacion/organizacion.repository';
import { OrganizacionEntity } from 'src/organizacion/organizacion.entity';
import { OrganizacionModule } from 'src/organizacion/organizacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EjecucionProcesoEntity, ParametrosGlobalesEntity, OrganizacionEntity]),
    EstadoProcesoModule,
    ProcesoModule,
    OrquestacionModule,
    OrganizacionModule
  ],
  controllers: [EjecucionProcesoController],
  providers: [
    EjecucionProcesoService,
    EjecucionProcesoRepository,
    ParametrosGlobalesRepository,
    OrganizacionRepository,
    ListarEjecucionesUseCase,
    CrearEjecucionUseCase,
    CrearEventoEjecucionUseCase,
    FinalizarEventoEjecucionUseCase,
    ObtenerDashboardUseCase,
  ],
  exports: [EjecucionProcesoService],
})
export class EjecucionProcesoModule {}
