import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDestinoEntity } from './tipo-destino.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoDestinoEntity])],
    controllers: [],
    providers: [],
    exports: [],
})
export class TipoDestinoModule { }
