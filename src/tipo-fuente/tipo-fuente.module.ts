import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoFuenteEntity } from './tipo-fuente.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoFuenteEntity])],
    controllers: [],
    providers: [],
    exports: [],
})
export class TipoFuenteModule { }
