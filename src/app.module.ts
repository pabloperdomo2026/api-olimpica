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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
