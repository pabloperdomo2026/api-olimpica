import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers';
import { UserUseCase } from '../usecases';
import { UserRepository } from '../repositories';
import { User } from '../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserUseCase, UserRepository],
    exports: [UserUseCase, UserRepository],
})
export class UserModule { }
