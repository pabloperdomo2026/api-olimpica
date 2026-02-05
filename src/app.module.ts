import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { OrquestacionModule } from './orquestacion/orquestacion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { ProcesoModule } from './proceso/proceso.module';
import { DatabaseModule } from './database/database.module';

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
    OrganizacionModule,
    ProcesoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
