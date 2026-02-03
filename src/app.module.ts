import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutenticacionModule, OrquestacionModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AutenticacionModule,
    OrquestacionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
