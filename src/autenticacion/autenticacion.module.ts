import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../usuario/usuario.module';
import { LoginUseCase } from '../orquestacion/casos-de-uso/login.use-case';
import { AutenticacionController } from './autenticacion.controller';
import { JwtStrategy } from './estrategias/jwt.strategy';
import { SolicitarOtpUseCase } from './casos-de-uso/solicitar-otp.use-case';
import { VerificarOtpUseCase } from './casos-de-uso/verificar-otp.use-case';
import { ActualizarContrasenaUseCase } from './casos-de-uso/actualizar-contrasena.use-case';
import { CorreoService } from './servicios/correo.service';
import { OtpEntity } from './entities/otp.entity';
import { OtpRepository } from './repositories/otp.repository';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    TypeOrmModule.forFeature([OtpEntity]),
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
  providers: [
    LoginUseCase,
    JwtStrategy,
    SolicitarOtpUseCase,
    VerificarOtpUseCase,
    ActualizarContrasenaUseCase,
    CorreoService,
    OtpRepository,
  ],
  exports: [JwtModule],
})
export class AutenticacionModule {}
