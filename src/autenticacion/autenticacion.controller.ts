import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase, LoginResponse } from '../orquestacion/casos-de-uso/login.use-case';
import { SignInDto } from '../orquestacion/dtos/sign-in.dto';
import { SolicitarOtpUseCase } from './casos-de-uso/solicitar-otp.use-case';
import { VerificarOtpUseCase } from './casos-de-uso/verificar-otp.use-case';
import { ActualizarContrasenaUseCase } from './casos-de-uso/actualizar-contrasena.use-case';
import { SolicitarOtpDto } from './dtos/solicitar-otp.dto';
import { VerificarOtpDto } from './dtos/verificar-otp.dto';
import { ActualizarContrasenaDto } from './dtos/actualizar-contrasena.dto';

@ApiTags('Autenticacion')
@Controller({ version: '1', path: 'auth' })
export class AutenticacionController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly solicitarOtpUseCase: SolicitarOtpUseCase,
    private readonly verificarOtpUseCase: VerificarOtpUseCase,
    private readonly actualizarContrasenaUseCase: ActualizarContrasenaUseCase,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion', description: 'Autentica al usuario y retorna un JWT' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna access token' })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  async login(@Body() data: SignInDto): Promise<LoginResponse> {
    return this.loginUseCase.execute(data);
  }

  @Post('olvidar-contrasena')
  @ApiOperation({ summary: 'Solicitar OTP', description: 'Verifica que el correo exista y envia un codigo OTP de 4 digitos' })
  @ApiResponse({ status: 200, description: 'Codigo OTP enviado al correo' })
  @ApiResponse({ status: 404, description: 'Correo no registrado en el sistema' })
  async olvidarContrasena(@Body() datos: SolicitarOtpDto): Promise<{ mensaje: string }> {
    return this.solicitarOtpUseCase.execute(datos.correo);
  }

  @Post('verificar-otp')
  @ApiOperation({ summary: 'Verificar OTP', description: 'Verifica si el codigo OTP es valido y no ha expirado' })
  @ApiResponse({ status: 200, description: 'Resultado de la verificacion' })
  async verificarOtp(@Body() datos: VerificarOtpDto): Promise<{ valido: boolean }> {
    return this.verificarOtpUseCase.execute(datos.correo, datos.codigo);
  }

  @Post('actualizar-contrasena')
  @ApiOperation({ summary: 'Actualizar contrasena', description: 'Verifica el OTP y actualiza la contrasena del usuario' })
  @ApiResponse({ status: 200, description: 'Contrasena actualizada correctamente' })
  @ApiResponse({ status: 401, description: 'Codigo invalido o expirado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async actualizarContrasena(@Body() datos: ActualizarContrasenaDto): Promise<{ mensaje: string }> {
    return this.actualizarContrasenaUseCase.execute(datos.correo, datos.codigo, datos.nuevaContrasena);
  }
}
