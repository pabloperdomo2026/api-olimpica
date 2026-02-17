import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRolEntity } from './usuario-rol.entity';
import { UsuarioRolController } from './usuario-rol.controller';
import { UsuarioRolService } from './usuario-rol.service';
import { UsuarioRolRepository } from './usuario-rol.repository';
import { UsuarioModule } from '../usuario/usuario.module';
import { RolModule } from '../rol/rol.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRolEntity]),
    UsuarioModule,
    RolModule,
  ],
  controllers: [UsuarioRolController],
  providers: [UsuarioRolService, UsuarioRolRepository],
  exports: [UsuarioRolService],
})
export class UsuarioRolModule {}
