import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../controllers';
import { UserUseCase } from '../usecases';
import { UserRepository } from '../repositories';
import { User } from '../database/entities';
import { SignInUseCase } from 'src/usecases/sign-in.use-case';

@Module({
    // imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [SignInUseCase],
    exports: [],
})
export class AuthModule { }
