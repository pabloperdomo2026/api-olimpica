import { Module } from '@nestjs/common';

import { LoginUseCase } from 'src/orquestacion/casos-de-uso/login.use-case';
import { AutenticacionController } from './autenticacion.controller';

@Module({
    controllers: [AutenticacionController],
    providers: [LoginUseCase],
    exports: [],
})
export class AutenticacionModule { }
