import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDestinoController } from './tipo-destino.controller';
import { TipoDestinoService } from './tipo-destino.service';
import { TipoDestinoRepository } from './tipo-destino.repository';
import { TipoDestinoEntity } from './tipo-destino.entity';
import { CrearTipoDestinoUseCase } from './casos-de-uso/crear-tipo-destino.use-case';
import { ListarTipoDestinoUseCase } from './casos-de-uso/listar-tipo-destino.use-case';
import { ActualizarTipoDestinoUseCase } from './casos-de-uso/actualizar-tipo-destino.use-case';
import { EliminarTipoDestinoUseCase } from './casos-de-uso/eliminar-tipo-destino.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDestinoEntity])],
  controllers: [TipoDestinoController],
  providers: [
    TipoDestinoService,
    TipoDestinoRepository,
    CrearTipoDestinoUseCase,
    ListarTipoDestinoUseCase,
    ActualizarTipoDestinoUseCase,
    EliminarTipoDestinoUseCase,
  ],
  exports: [TipoDestinoService, TipoDestinoRepository],
})
export class TipoDestinoModule {}
