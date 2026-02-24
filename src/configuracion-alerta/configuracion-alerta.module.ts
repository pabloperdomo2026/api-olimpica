import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionAlertaController } from './configuracion-alerta.controller';
import { ConfiguracionAlertaService } from './configuracion-alerta.service';
import { ConfiguracionAlertaRepository } from './configuracion-alerta.repository';
import { ConfiguracionAlertaEntity } from './configuracion-alerta.entity';
import { CrearConfiguracionAlertaUseCase } from './casos-de-uso/crear-configuracion-alerta.use-case';
import { ListarConfiguracionAlertaUseCase } from './casos-de-uso/listar-configuracion-alerta.use-case';
import { ActualizarConfiguracionAlertaUseCase } from './casos-de-uso/actualizar-configuracion-alerta.use-case';
import { EliminarConfiguracionAlertaUseCase } from './casos-de-uso/eliminar-configuracion-alerta.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ConfiguracionAlertaEntity])],
  controllers: [ConfiguracionAlertaController],
  providers: [
    ConfiguracionAlertaService,
    ConfiguracionAlertaRepository,
    CrearConfiguracionAlertaUseCase,
    ListarConfiguracionAlertaUseCase,
    ActualizarConfiguracionAlertaUseCase,
    EliminarConfiguracionAlertaUseCase,
  ],
  exports: [ConfiguracionAlertaService],
})
export class ConfiguracionAlertaModule {}
