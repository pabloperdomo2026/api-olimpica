import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionesSistemaController } from './funciones-sistema.controller';
import { FuncionesSistemaService } from './funciones-sistema.service';
import { FuncionesSistemaRepository } from './funciones-sistema.repository';
import { FuncionesSistemaEntity } from './funciones-sistema.entity';
import { CrearFuncionesSistemaUseCase } from './casos-de-uso/crear-funciones-sistema.use-case';
import { ListarFuncionesSistemaUseCase } from './casos-de-uso/listar-funciones-sistema.use-case';
import { ActualizarFuncionesSistemaUseCase } from './casos-de-uso/actualizar-funciones-sistema.use-case';
import { EliminarFuncionesSistemaUseCase } from './casos-de-uso/eliminar-funciones-sistema.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([FuncionesSistemaEntity])],
  controllers: [FuncionesSistemaController],
  providers: [
    FuncionesSistemaService,
    FuncionesSistemaRepository,
    CrearFuncionesSistemaUseCase,
    ListarFuncionesSistemaUseCase,
    ActualizarFuncionesSistemaUseCase,
    EliminarFuncionesSistemaUseCase,
  ],
  exports: [FuncionesSistemaService, FuncionesSistemaRepository],
})
export class FuncionesSistemaModule {}
