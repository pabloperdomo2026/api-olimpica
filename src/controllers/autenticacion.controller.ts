import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { LoginUseCase } from 'src/usecases/login.use-case';
import { SignInDto } from 'src/dtos/sign-in.dto';

@Controller({ version: '1', path: 'auth' })
export class AutenticacionController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @Post('sign-in')
    async login(@Body() data: SignInDto) {
        return this.loginUseCase.execute(data);
    }
}
