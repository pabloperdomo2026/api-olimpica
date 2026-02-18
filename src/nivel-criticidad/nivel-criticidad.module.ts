import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelCriticidadEntity } from './nivel-criticidad.entity';

@Module({
    imports: [TypeOrmModule.forFeature([NivelCriticidadEntity])],
    controllers: [],
    providers: [

    ],
    exports: [],
})
export class NivelCriticidadModule { }
