import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuenteDatosController } from './fuente-datos.controller';
import { FuenteDatosService } from './fuente-datos.service';
import { FuenteDatosRepository } from './fuente-datos.repository';
import { FuenteDatosEntity } from './fuente-datos.entity';
import { CrearFuenteDatosUseCase } from './casos-de-uso/crear-fuente-datos.use-case';
import { ListarFuenteDatosUseCase } from './casos-de-uso/listar-fuente-datos.use-case';
import { ActualizarFuenteDatosUseCase } from './casos-de-uso/actualizar-fuente-datos.use-case';
import { EliminarFuenteDatosUseCase } from './casos-de-uso/eliminar-fuente-datos.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([FuenteDatosEntity])],
  controllers: [FuenteDatosController],
  providers: [
    FuenteDatosService,
    FuenteDatosRepository,
    CrearFuenteDatosUseCase,
    ListarFuenteDatosUseCase,
    ActualizarFuenteDatosUseCase,
    EliminarFuenteDatosUseCase,
  ],
  exports: [FuenteDatosService, FuenteDatosRepository],
})
export class FuenteDatosModule {}
