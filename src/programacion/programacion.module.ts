import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ProgramacionEntity } from './programacion.entity';
import { ProgramacionRepository } from './programacion.repository';
import { ProgramacionService } from './programacion.service';
import { ProgramacionCrudService } from './programacion-crud.service';
import { ProgramacionController } from './programacion.controller';
import { ListarProgramacionesUseCase } from './casos-de-uso/listar-programaciones.use-case';
import { CrearProgramacionUseCase } from './casos-de-uso/crear-programacion.use-case';
import { ActualizarProgramacionUseCase } from './casos-de-uso/actualizar-programacion.use-case';
import { EliminarProgramacionUseCase } from './casos-de-uso/eliminar-programacion.use-case';
import { EjecucionProcesoModule } from '../ejecucion-proceso/ejecucion-proceso.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ProgramacionEntity]),
    EjecucionProcesoModule,
  ],
  controllers: [ProgramacionController],
  providers: [
    ProgramacionRepository,
    ProgramacionService,
    ProgramacionCrudService,
    ListarProgramacionesUseCase,
    CrearProgramacionUseCase,
    ActualizarProgramacionUseCase,
    EliminarProgramacionUseCase,
  ],
})
export class ProgramacionModule {}
