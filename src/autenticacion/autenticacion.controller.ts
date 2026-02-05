import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { LoginUseCase } from 'src/orquestacion/casos-de-uso/login.use-case';
import { SignInDto } from 'src/orquestacion/dtos/sign-in.dto';

@Controller({ version: '1', path: 'auth' })
export class AutenticacionController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('sign-in')
    async login(@Body() data: SignInDto) {
        return this.loginUseCase.execute(data);
    }
}
