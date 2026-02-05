import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntoVentaController } from './punto-venta.controller';
import { PuntoVentaService } from './punto-venta.service';
import { PuntoVentaRepository } from './punto-venta.repository';
import { PuntoVentaEntity } from './punto-venta.entity';
import { CrearPuntoVentaUseCase } from './casos-de-uso/crear-punto-venta.use-case';
import { ListarPuntosVentaUseCase } from './casos-de-uso/listar-puntos-venta.use-case';
import { EditarPuntoVentaUseCase } from './casos-de-uso/editar-punto-venta.use-case';
import { EliminarPuntoVentaUseCase } from './casos-de-uso/eliminar-punto-venta.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([PuntoVentaEntity])],
  controllers: [PuntoVentaController],
  providers: [
    PuntoVentaService,
    PuntoVentaRepository,
    CrearPuntoVentaUseCase,
    ListarPuntosVentaUseCase,
    EditarPuntoVentaUseCase,
    EliminarPuntoVentaUseCase,
  ],
  exports: [PuntoVentaService],
})
export class PuntoVentaModule {}
