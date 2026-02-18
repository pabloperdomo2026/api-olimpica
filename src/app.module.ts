import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { OrquestacionModule } from './orquestacion/orquestacion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { ProcesoModule } from './proceso/proceso.module';
import { RolModule } from './rol/rol.module';
import { PermisoModule } from './permiso/permiso.module';
import { PuntoVentaModule } from './punto-venta/punto-venta.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { RolPermisoModule } from './rol-permiso/rol-permiso.module';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module';
import { ProveedorCloudModule } from './proveedor-cloud/proveedor-cloud.module';
import { ServicioCloudModule } from './servicio-cloud/servicio-cloud.module';
import { MonedaModule } from './moneda/moneda.module';
import { ParametrosGlobalesModule } from './parametros-globales/parametros-globales.module';
import { CalendarioModule } from './calendario/calendario.module';
import { NivelCriticidadModule } from './nivel-criticidad/nivel-criticidad.module';
import { TipoAlertaModule } from './tipo-alerta/tipo-alerta.module';
import { TipoDatoModule } from './tipo-dato/tipo-dato.module';
import { TipoDestinoModule } from './tipo-destino/tipo-destino.module';
import { TipoFuenteModule } from './tipo-fuente/tipo-fuente.module';
import { TipoProcesoModule } from './tipo-proceso/tipo-proceso.module';
import { TipoProgramacionModule } from './tipo-programacion/tipo-programacion.module';
import { EstadoProcesoModule } from './status-proceso/estado-proceso.module';
import { MensajeErrorModule } from './mensaje-error/mensaje-error.module';
import { FuncionesSistemaModule } from './funciones-sistema/funciones-sistema.module';
import { DestinoDatosModule } from './destino-datos/destino-datos.module';
import { TasaCambioModule } from './tasa-cambio/tasa.cambio.module';
import { ColumnaDestinoModule } from './columna-destino/columna-destino.module';
import { FuenteDatosModule } from './fuente-datos/fuente-datos.module';
import { ColumnaOrigenModule } from './columna-origen/columna-origen.module';
import { ProcesoMapeoCampoModule } from './proceso-mapeo-campo/proceso-mapeo-campo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AutenticacionModule,
    OrquestacionModule,
    UsuarioModule,
    UsuarioRolModule,
    OrganizacionModule,
    ProveedorCloudModule,
    ServicioCloudModule,
    ProcesoModule,
    RolModule,
    RolPermisoModule,
    PermisoModule,
    PuntoVentaModule,
    MonedaModule,
    ParametrosGlobalesModule,
    HealthModule,
    CalendarioModule,
    NivelCriticidadModule,
    TipoAlertaModule,
    TipoDatoModule,
    TipoDestinoModule,
    TipoFuenteModule,
    TipoProcesoModule,
    TipoProgramacionModule,
    EstadoProcesoModule,
    MensajeErrorModule,
    FuncionesSistemaModule,
    DestinoDatosModule,
    TasaCambioModule,
    ColumnaDestinoModule,
    FuenteDatosModule,
    ColumnaOrigenModule,
    ProcesoMapeoCampoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
