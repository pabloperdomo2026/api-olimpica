import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ProgramacionRepository } from './programacion.repository';
import { EjecucionProcesoService } from '../ejecucion-proceso/ejecucion-proceso.service';

@Injectable()
export class ProgramacionService implements OnModuleInit {
  private readonly logger = new Logger(ProgramacionService.name);

  constructor(
    private readonly programacionRepository: ProgramacionRepository,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly ejecucionProcesoService: EjecucionProcesoService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.cargarProgramaciones();
    } catch (error) {
      this.logger.error(`Error al cargar programaciones al inicio: ${error.message}`);
    }
  }

  async cargarProgramaciones(): Promise<void> {
    const programaciones = await this.programacionRepository.listarActivas();

    if (programaciones.length === 0) {
      this.logger.warn('No hay programaciones activas en smr_programacion');
      return;
    }

    let registradas = 0;

    for (const programacion of programaciones) {
      if (!programacion.expresionCron) {
        this.logger.warn(
          `Programacion "${programacion.nombre}" no tiene expresion cron, se omite`,
        );
        continue;
      }

      const exito = this.registrarJob(
        programacion.id,
        programacion.nombre,
        programacion.expresionCron,
        programacion.procesoId,
      );

      if (exito) registradas++;
    }

    this.logger.log(`${registradas} de ${programaciones.length} programacion(es) registradas`);
  }

  private normalizarExpresionCron(expresion: string): string {
    // La libreria cron v4 requiere 6 campos: segundo minuto hora dia mes semana
    // Si la expresion tiene solo 5 campos (estandar unix), se agrega '0' al inicio
    const campos = expresion.trim().split(/\s+/);
    if (campos.length === 5) {
      return `0 ${expresion.trim()}`;
    }
    return expresion.trim();
  }

  private registrarJob(
    programacionId: string,
    nombre: string,
    expresionCron: string,
    procesoId: string,
  ): boolean {
    const nombreJob = `job_${programacionId}`;
    const expresionNormalizada = this.normalizarExpresionCron(expresionCron);

    try {
      if (this.schedulerRegistry.doesExist('cron', nombreJob)) {
        this.schedulerRegistry.deleteCronJob(nombreJob);
        this.logger.log(`Job existente reemplazado: ${nombreJob}`);
      }

      const job = new CronJob(expresionNormalizada, async () => {
        this.logger.log(`Ejecutando job "${nombre}" (proceso: ${procesoId})`);
        try {
          await this.ejecucionProcesoService.crear({
            procesoId,
            tipoEjecucion: 'AUTOMATICO',
            usuarioSolicita: 'sistema',
          });
          this.logger.log(`Job "${nombre}" ejecutado correctamente`);
        } catch (error) {
          this.logger.error(`Error al ejecutar job "${nombre}": ${error.message}`);
        }
      }, null, false, process.env.TZ || 'America/Bogota');

      this.schedulerRegistry.addCronJob(nombreJob, job);
      job.start();

      this.logger.log(
        `Job registrado: "${nombre}" | cron: "${expresionNormalizada}" | proceso: ${procesoId}`,
      );

      return true;
    } catch (error) {
      this.logger.error(
        `Expresion cron invalida para "${nombre}" (expresion: "${expresionCron}"): ${error.message}`,
      );
      return false;
    }
  }
}
