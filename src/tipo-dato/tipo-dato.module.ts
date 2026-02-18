import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDatoEntity } from './tipo-dato.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoDatoEntity])],
    controllers: [],
    providers: [

    ],
    exports: [],
})
export class TipoDatoModule { }
