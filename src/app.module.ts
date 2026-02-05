import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { OrquestacionModule } from './orquestacion/orquestacion.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AutenticacionModule,
    OrquestacionModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
