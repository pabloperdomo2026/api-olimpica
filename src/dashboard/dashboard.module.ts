import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ParametrosGlobalesModule } from '../parametros-globales/parametros-globales.module';
import { DashboardScheduler } from './dashboard.scheduler';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ParametrosGlobalesModule,
  ],
  providers: [DashboardScheduler],
})
export class DashboardModule {}
