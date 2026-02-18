import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDatoController } from './tipo-dato.controller';
import { TipoDatoService } from './tipo-dato.service';
import { TipoDatoRepository } from './tipo-dato.repository';
import { TipoDatoEntity } from './tipo-dato.entity';
import { CrearTipoDatoUseCase } from './casos-de-uso/crear-tipo-dato.use-case';
import { ListarTipoDatoUseCase } from './casos-de-uso/listar-tipo-dato.use-case';
import { ActualizarTipoDatoUseCase } from './casos-de-uso/actualizar-tipo-dato.use-case';
import { EliminarTipoDatoUseCase } from './casos-de-uso/eliminar-tipo-dato.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDatoEntity])],
  controllers: [TipoDatoController],
  providers: [
    TipoDatoService,
    TipoDatoRepository,
    CrearTipoDatoUseCase,
    ListarTipoDatoUseCase,
    ActualizarTipoDatoUseCase,
    EliminarTipoDatoUseCase,
  ],
  exports: [TipoDatoService, TipoDatoRepository],
})
export class TipoDatoModule {}
