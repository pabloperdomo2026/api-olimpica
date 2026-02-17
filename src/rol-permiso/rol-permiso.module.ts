import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolPermisoEntity } from './rol-permiso.entity';
import { RolPermisoController } from './rol-permiso.controller';
import { RolPermisoService } from './rol-permiso.service';
import { RolPermisoRepository } from './rol-permiso.repository';
import { RolModule } from '../rol/rol.module';
import { PermisoModule } from '../permiso/permiso.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolPermisoEntity]),
    RolModule,
    PermisoModule,
  ],
  controllers: [RolPermisoController],
  providers: [RolPermisoService, RolPermisoRepository],
  exports: [RolPermisoService],
})
export class RolPermisoModule {}
