import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnaDestinoController } from './columna-destino.controller';
import { ColumnaDestinoService } from './columna-destino.service';
import { ColumnaDestinoRepository } from './columna-destino.repository';
import { ColumnaDestinoEntity } from './columna-destino.entity';
import { CrearColumnaDestinoUseCase } from './casos-de-uso/crear-columna-destino.use-case';
import { ListarColumnaDestinoUseCase } from './casos-de-uso/listar-columna-destino.use-case';
import { ActualizarColumnaDestinoUseCase } from './casos-de-uso/actualizar-columna-destino.use-case';
import { EliminarColumnaDestinoUseCase } from './casos-de-uso/eliminar-columna-destino.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnaDestinoEntity])],
  controllers: [ColumnaDestinoController],
  providers: [
    ColumnaDestinoService,
    ColumnaDestinoRepository,
    CrearColumnaDestinoUseCase,
    ListarColumnaDestinoUseCase,
    ActualizarColumnaDestinoUseCase,
    EliminarColumnaDestinoUseCase,
  ],
  exports: [ColumnaDestinoService, ColumnaDestinoRepository],
})
export class ColumnaDestinoModule {}
