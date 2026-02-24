import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipienteCorreoController } from './recipiente-correo.controller';
import { RecipienteCorreoService } from './recipiente-correo.service';
import { RecipienteCorreoRepository } from './recipiente-correo.repository';
import { RecipienteCorreoEntity } from './recipiente-correo.entity';
import { CrearRecipienteCorreoUseCase } from './casos-de-uso/crear-recipiente-correo.use-case';
import { ListarRecipienteCorreoUseCase } from './casos-de-uso/listar-recipiente-correo.use-case';
import { ActualizarRecipienteCorreoUseCase } from './casos-de-uso/actualizar-recipiente-correo.use-case';
import { EliminarRecipienteCorreoUseCase } from './casos-de-uso/eliminar-recipiente-correo.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RecipienteCorreoEntity])],
  controllers: [RecipienteCorreoController],
  providers: [
    RecipienteCorreoService,
    RecipienteCorreoRepository,
    CrearRecipienteCorreoUseCase,
    ListarRecipienteCorreoUseCase,
    ActualizarRecipienteCorreoUseCase,
    EliminarRecipienteCorreoUseCase,
  ],
  exports: [RecipienteCorreoService],
})
export class RecipienteCorreoModule {}
