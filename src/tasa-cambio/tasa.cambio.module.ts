import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasaCambioController } from './tasa-cambio.controller';
import { TasaCambioService } from './tasa-cambio.service';
import { TasaCambioRepository } from './tasa-cambio.repository';
import { TasaCambioEntity } from './tasa-cambio.entity';
import { CrearTasaCambioUseCase } from './casos-de-uso/crear-tasa-cambio.use-case';
import { ListarTasaCambioUseCase } from './casos-de-uso/listar-tasa-cambio.use-case';
import { ActualizarTasaCambioUseCase } from './casos-de-uso/actualizar-tasa-cambio.use-case';
import { EliminarTasaCambioUseCase } from './casos-de-uso/eliminar-tasa-cambio.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TasaCambioEntity])],
  controllers: [TasaCambioController],
  providers: [
    TasaCambioService,
    TasaCambioRepository,
    CrearTasaCambioUseCase,
    ListarTasaCambioUseCase,
    ActualizarTasaCambioUseCase,
    EliminarTasaCambioUseCase,
  ],
  exports: [TasaCambioService, TasaCambioRepository],
})
export class TasaCambioModule {}
