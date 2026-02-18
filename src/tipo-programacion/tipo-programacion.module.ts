import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProgramacionEntity } from './tipo-programacion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoProgramacionEntity])],
    controllers: [],
    providers: [],
    exports: [],
})
export class TipoProgramacionModule { }
