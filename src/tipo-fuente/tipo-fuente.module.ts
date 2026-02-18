import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoFuenteController } from './tipo-fuente.controller';
import { TipoFuenteService } from './tipo-fuente.service';
import { TipoFuenteRepository } from './tipo-fuente.repository';
import { TipoFuenteEntity } from './tipo-fuente.entity';
import { CrearTipoFuenteUseCase } from './casos-de-uso/crear-tipo-fuente.use-case';
import { ListarTipoFuenteUseCase } from './casos-de-uso/listar-tipo-fuente.use-case';
import { ActualizarTipoFuenteUseCase } from './casos-de-uso/actualizar-tipo-fuente.use-case';
import { EliminarTipoFuenteUseCase } from './casos-de-uso/eliminar-tipo-fuente.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoFuenteEntity])],
  controllers: [TipoFuenteController],
  providers: [
    TipoFuenteService,
    TipoFuenteRepository,
    CrearTipoFuenteUseCase,
    ListarTipoFuenteUseCase,
    ActualizarTipoFuenteUseCase,
    EliminarTipoFuenteUseCase,
  ],
  exports: [TipoFuenteService, TipoFuenteRepository],
})
export class TipoFuenteModule {}
