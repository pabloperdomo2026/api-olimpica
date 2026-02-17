import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioCloudEntity } from './servicio-cloud.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ServicioCloudEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ServicioCloudModule {}
