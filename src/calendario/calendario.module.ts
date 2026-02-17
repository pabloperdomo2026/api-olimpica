import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarioController } from './calendario.controller';
import { CalendarioService } from './calendario.service';
import { CalendarioRepository } from './calendario.repository';
import { CalendarioEntity } from './calendario.entity';
import { CrearCalendarioUseCase } from './casos-de-uso/crear-calendario.use-case';
import { ListarCalendariosUseCase } from './casos-de-uso/listar-calendarios.use-case';
import { EditarCalendarioUseCase } from './casos-de-uso/editar-calendario.use-case';
import { EliminarCalendarioUseCase } from './casos-de-uso/eliminar-calendario.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarioEntity])],
  controllers: [CalendarioController],
  providers: [
    CalendarioService,
    CalendarioRepository,
    CrearCalendarioUseCase,
    ListarCalendariosUseCase,
    EditarCalendarioUseCase,
    EliminarCalendarioUseCase,
  ],
  exports: [CalendarioService, CalendarioRepository],
})
export class CalendarioModule {}
