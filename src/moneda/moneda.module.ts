import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonedaController } from './moneda.controller';
import { MonedaService } from './moneda.service';
import { MonedaRepository } from './moneda.repository';
import { MonedaEntity } from './moneda.entity';
import { CrearMonedaUseCase } from './casos-de-uso/crear-moneda.use-case';
import { ListarMonedasUseCase } from './casos-de-uso/listar-monedas.use-case';
import { EditarMonedaUseCase } from './casos-de-uso/editar-moneda.use-case';
import { EliminarMonedaUseCase } from './casos-de-uso/eliminar-moneda.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([MonedaEntity])],
  controllers: [MonedaController],
  providers: [
    MonedaService,
    MonedaRepository,
    CrearMonedaUseCase,
    ListarMonedasUseCase,
    EditarMonedaUseCase,
    EliminarMonedaUseCase,
  ],
  exports: [MonedaService, MonedaRepository],
})
export class MonedaModule {}
