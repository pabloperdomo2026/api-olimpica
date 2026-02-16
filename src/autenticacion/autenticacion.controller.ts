import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase, LoginResponse } from '../orquestacion/casos-de-uso/login.use-case';
import { SignInDto } from '../orquestacion/dtos/sign-in.dto';

@ApiTags('Autenticacion')
@Controller({ version: '1', path: 'auth' })
export class AutenticacionController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion', description: 'Autentica al usuario y retorna un JWT' })
  @ApiResponse({ status: 200, description: 'Login exitoso, retorna access token' })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  async login(@Body() data: SignInDto): Promise<LoginResponse> {
    return this.loginUseCase.execute(data);
  }
}
