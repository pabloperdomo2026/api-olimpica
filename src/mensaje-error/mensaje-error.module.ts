import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeErrorController } from './mensaje-error.controller';
import { MensajeErrorService } from './mensaje-error.service';
import { MensajeErrorRepository } from './mensaje-error.repository';
import { MensajeErrorEntity } from './mensaje-error.entity';
import { CrearMensajeErrorUseCase } from './casos-de-uso/crear-mensaje-error.use-case';
import { ListarMensajeErrorUseCase } from './casos-de-uso/listar-mensaje-error.use-case';
import { ActualizarMensajeErrorUseCase } from './casos-de-uso/actualizar-mensaje-error.use-case';
import { EliminarMensajeErrorUseCase } from './casos-de-uso/eliminar-mensaje-error.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([MensajeErrorEntity])],
  controllers: [MensajeErrorController],
  providers: [
    MensajeErrorService,
    MensajeErrorRepository,
    CrearMensajeErrorUseCase,
    ListarMensajeErrorUseCase,
    ActualizarMensajeErrorUseCase,
    EliminarMensajeErrorUseCase,
  ],
  exports: [MensajeErrorService, MensajeErrorRepository],
})
export class MensajeErrorModule {}
