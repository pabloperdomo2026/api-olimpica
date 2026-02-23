import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ProgramacionEntity } from './programacion.entity';
import { ProgramacionRepository } from './programacion.repository';
import { ProgramacionService } from './programacion.service';
import { EjecucionProcesoModule } from '../ejecucion-proceso/ejecucion-proceso.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ProgramacionEntity]),
    EjecucionProcesoModule,
  ],
  providers: [ProgramacionRepository, ProgramacionService],
})
export class ProgramacionModule {}
