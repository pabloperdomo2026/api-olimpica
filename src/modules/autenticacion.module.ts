import { Module } from '@nestjs/common';
import { AutenticacionController } from '../controllers';
import { LoginUseCase } from 'src/usecases/login.use-case';

@Module({
    controllers: [AutenticacionController],
    providers: [LoginUseCase],
    exports: [],
})
export class AutenticacionModule { }
