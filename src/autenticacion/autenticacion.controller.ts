import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase, LoginResponse } from '../orquestacion/casos-de-uso/login.use-case';
import { SignInDto } from '../orquestacion/dtos/sign-in.dto';
import { SolicitarOtpUseCase } from './casos-de-uso/solicitar-otp.use-case';
import { SolicitarOtpDto } from './dtos/solicitar-otp.dto';

@ApiTags('Autenticacion')
@Controller({ version: '1', path: 'auth' })
export class AutenticacionController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly solicitarOtpUseCase: SolicitarOtpUseCase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion', description: 'Autentica al usuario y retorna un JWT' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna access token' })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  async login(@Body() data: SignInDto): Promise<LoginResponse> {
    return this.loginUseCase.execute(data);
  }

  @Post('olvidar-contrasena')
  @ApiOperation({ summary: 'Solicitar OTP de recuperacion', description: 'Verifica que el correo exista y envia un codigo OTP de 4 digitos' })
  @ApiResponse({ status: 200, description: 'Codigo OTP enviado al correo' })
  @ApiResponse({ status: 404, description: 'Correo no registrado en el sistema' })
  async olvidarContrasena(@Body() datos: SolicitarOtpDto): Promise<{ mensaje: string }> {
    return this.solicitarOtpUseCase.execute(datos.correo);
  }
}
