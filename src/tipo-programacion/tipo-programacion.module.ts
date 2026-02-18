import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProgramacionController } from './tipo-programacion.controller';
import { TipoProgramacionService } from './tipo-programacion.service';
import { TipoProgramacionRepository } from './tipo-programacion.repository';
import { TipoProgramacionEntity } from './tipo-programacion.entity';
import { CrearTipoProgramacionUseCase } from './casos-de-uso/crear-tipo-programacion.use-case';
import { ListarTipoProgramacionUseCase } from './casos-de-uso/listar-tipo-programacion.use-case';
import { ActualizarTipoProgramacionUseCase } from './casos-de-uso/actualizar-tipo-programacion.use-case';
import { EliminarTipoProgramacionUseCase } from './casos-de-uso/eliminar-tipo-programacion.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProgramacionEntity])],
  controllers: [TipoProgramacionController],
  providers: [
    TipoProgramacionService,
    TipoProgramacionRepository,
    CrearTipoProgramacionUseCase,
    ListarTipoProgramacionUseCase,
    ActualizarTipoProgramacionUseCase,
    EliminarTipoProgramacionUseCase,
  ],
  exports: [TipoProgramacionService, TipoProgramacionRepository],
})
export class TipoProgramacionModule {}
