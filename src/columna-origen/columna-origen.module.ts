import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnaOrigenController } from './columna-origen.controller';
import { ColumnaOrigenService } from './columna-origen.service';
import { ColumnaOrigenRepository } from './columna-origen.repository';
import { ColumnaOrigenEntity } from './columna-origen.entity';
import { CrearColumnaOrigenUseCase } from './casos-de-uso/crear-columna-origen.use-case';
import { ListarColumnaOrigenUseCase } from './casos-de-uso/listar-columna-origen.use-case';
import { ActualizarColumnaOrigenUseCase } from './casos-de-uso/actualizar-columna-origen.use-case';
import { EliminarColumnaOrigenUseCase } from './casos-de-uso/eliminar-columna-origen.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnaOrigenEntity])],
  controllers: [ColumnaOrigenController],
  providers: [
    ColumnaOrigenService,
    ColumnaOrigenRepository,
    CrearColumnaOrigenUseCase,
    ListarColumnaOrigenUseCase,
    ActualizarColumnaOrigenUseCase,
    EliminarColumnaOrigenUseCase,
  ],
  exports: [ColumnaOrigenService, ColumnaOrigenRepository],
})
export class ColumnaOrigenModule {}
