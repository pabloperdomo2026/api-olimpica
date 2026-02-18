import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProcesoEntity } from './tipo-proceso.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoProcesoEntity])],
    controllers: [],
    providers: [],
    exports: [],
})
export class TipoProcesoModule { }
