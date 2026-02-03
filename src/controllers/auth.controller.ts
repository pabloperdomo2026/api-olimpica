import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UserUseCase } from '../usecases';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { SignInUseCase } from 'src/usecases/sign-in.use-case';
import { SignInDto } from 'src/dtos/sign-in.dto';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
    constructor(private readonly signInUseCase: SignInUseCase) { }

    @Post('sign-in')
    async signIn(@Body() data: SignInDto) {
        return this.signInUseCase.execute(data);
    }
}
