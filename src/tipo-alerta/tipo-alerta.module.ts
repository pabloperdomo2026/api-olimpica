import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAlertaController } from './tipo-alerta.controller';
import { TipoAlertaService } from './tipo-alerta.service';
import { TipoAlertaRepository } from './tipo-alerta.repository';
import { TipoAlertaEntity } from './tipo-alerta.entity';
import { CrearTipoAlertaUseCase } from './casos-de-uso/crear-tipo-alerta.use-case';
import { ListarTipoAlertaUseCase } from './casos-de-uso/listar-tipo-alerta.use-case';
import { ActualizarTipoAlertaUseCase } from './casos-de-uso/actualizar-tipo-alerta.use-case';
import { EliminarTipoAlertaUseCase } from './casos-de-uso/eliminar-tipo-alerta.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAlertaEntity])],
  controllers: [TipoAlertaController],
  providers: [
    TipoAlertaService,
    TipoAlertaRepository,
    CrearTipoAlertaUseCase,
    ListarTipoAlertaUseCase,
    ActualizarTipoAlertaUseCase,
    EliminarTipoAlertaUseCase,
  ],
  exports: [TipoAlertaService, TipoAlertaRepository],
})
export class TipoAlertaModule {}
