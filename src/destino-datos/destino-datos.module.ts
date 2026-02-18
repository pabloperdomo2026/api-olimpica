import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinoDatosController } from './destino-datos.controller';
import { DestinoDatosService } from './destino-datos.service';
import { DestinoDatosRepository } from './destino-datos.repository';
import { DestinoDatosEntity } from './destino-datos.entity';
import { CrearDestinoDatosUseCase } from './casos-de-uso/crear-destino-datos.use-case';
import { ListarDestinoDatosUseCase } from './casos-de-uso/listar-destino-datos.use-case';
import { ActualizarDestinoDatosUseCase } from './casos-de-uso/actualizar-destino-datos.use-case';
import { EliminarDestinoDatosUseCase } from './casos-de-uso/eliminar-destino-datos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([DestinoDatosEntity])],
  controllers: [DestinoDatosController],
  providers: [
    DestinoDatosService,
    DestinoDatosRepository,
    CrearDestinoDatosUseCase,
    ListarDestinoDatosUseCase,
    ActualizarDestinoDatosUseCase,
    EliminarDestinoDatosUseCase,
  ],
  exports: [DestinoDatosService, DestinoDatosRepository],
})
export class DestinoDatosModule {}
