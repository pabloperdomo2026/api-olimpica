import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuarioModule } from '../usuario/usuario.module';
import { LoginUseCase } from '../orquestacion/casos-de-uso/login.use-case';
import { AutenticacionController } from './autenticacion.controller';
import { JwtStrategy } from './estrategias/jwt.strategy';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'default-secret'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION', '1d') as any,
        },
      }),
    }),
  ],
  controllers: [AutenticacionController],
  providers: [LoginUseCase, JwtStrategy],
  exports: [JwtModule],
})
export class AutenticacionModule {}
