import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionSlaController } from './configuracion-sla.controller';
import { ConfiguracionSlaService } from './configuracion-sla.service';
import { ConfiguracionSlaRepository } from './configuracion-sla.repository';
import { ConfiguracionSlaEntity } from './configuracion-sla.entity';
import { CrearConfiguracionSlaUseCase } from './casos-de-uso/crear-configuracion-sla.use-case';
import { ListarConfiguracionSlaUseCase } from './casos-de-uso/listar-configuracion-sla.use-case';
import { ActualizarConfiguracionSlaUseCase } from './casos-de-uso/actualizar-configuracion-sla.use-case';
import { EliminarConfiguracionSlaUseCase } from './casos-de-uso/eliminar-configuracion-sla.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ConfiguracionSlaEntity])],
  controllers: [ConfiguracionSlaController],
  providers: [
    ConfiguracionSlaService,
    ConfiguracionSlaRepository,
    CrearConfiguracionSlaUseCase,
    ListarConfiguracionSlaUseCase,
    ActualizarConfiguracionSlaUseCase,
    EliminarConfiguracionSlaUseCase,
  ],
  exports: [ConfiguracionSlaService],
})
export class ConfiguracionSlaModule {}
