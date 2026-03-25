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
import { ObtenerAlertasEjecucionUseCase } from './casos-de-uso/obtener-alertas-ejecucion.use-case';
import { CrearNotificacionUseCase } from './casos-de-uso/crear-notificacion.use-case';
import { AlertaEnviadaEntity } from '../alerta-enviada/alerta-enviada.entity';
import { ConfiguracionSlaEntity } from '../configuracion-sla/configuracion-sla.entity';
import { ConfiguracionSlaRepository } from '../configuracion-sla/configuracion-sla.repository';
import { ConfiguracionAlertaEntity } from '../configuracion-alerta/configuracion-alerta.entity';
import { ConfiguracionAlertaRepository } from '../configuracion-alerta/configuracion-alerta.repository';
import { EstadoProcesoModule } from '../status-proceso/estado-proceso.module';
import { ProcesoModule } from '../proceso/proceso.module';
import { OrquestacionModule } from 'src/orquestacion/orquestacion.module';
import { ParametrosGlobalesEntity } from 'src/parametros-globales/parametros-globales.entity';
import { ParametrosGlobalesRepository } from 'src/parametros-globales/parametros-globales.repository';
import { OrganizacionRepository } from 'src/organizacion/organizacion.repository';
import { OrganizacionEntity } from 'src/organizacion/organizacion.entity';
import { OrganizacionModule } from 'src/organizacion/organizacion.module';
import { CorreoService } from 'src/utils/ses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EjecucionProcesoEntity, ParametrosGlobalesEntity, OrganizacionEntity, AlertaEnviadaEntity, ConfiguracionSlaEntity, ConfiguracionAlertaEntity]),
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
    ConfiguracionSlaRepository,
    ConfiguracionAlertaRepository,
    OrganizacionRepository,
    CorreoService,
    ListarEjecucionesUseCase,
    CrearEjecucionUseCase,
    CrearEventoEjecucionUseCase,
    FinalizarEventoEjecucionUseCase,
    ObtenerDashboardUseCase,
    ObtenerAlertasEjecucionUseCase,
    CrearNotificacionUseCase,
  ],
  exports: [EjecucionProcesoService],
})
export class EjecucionProcesoModule {}
