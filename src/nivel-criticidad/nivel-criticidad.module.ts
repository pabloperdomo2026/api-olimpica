import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelCriticidadController } from './nivel-criticidad.controller';
import { NivelCriticidadService } from './nivel-criticidad.service';
import { NivelCriticidadRepository } from './nivel-criticidad.repository';
import { NivelCriticidadEntity } from './nivel-criticidad.entity';
import { CrearNivelCriticidadUseCase } from './casos-de-uso/crear-nivel-criticidad.use-case';
import { ListarNivelCriticidadUseCase } from './casos-de-uso/listar-nivel-criticidad.use-case';
import { ActualizarNivelCriticidadUseCase } from './casos-de-uso/actualizar-nivel-criticidad.use-case';
import { EliminarNivelCriticidadUseCase } from './casos-de-uso/eliminar-nivel-criticidad.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([NivelCriticidadEntity])],
  controllers: [NivelCriticidadController],
  providers: [
    NivelCriticidadService,
    NivelCriticidadRepository,
    CrearNivelCriticidadUseCase,
    ListarNivelCriticidadUseCase,
    ActualizarNivelCriticidadUseCase,
    EliminarNivelCriticidadUseCase,
  ],
  exports: [NivelCriticidadService, NivelCriticidadRepository],
})
export class NivelCriticidadModule {}
