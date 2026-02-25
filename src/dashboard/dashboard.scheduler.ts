import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { ParametrosGlobalesRepository } from '../parametros-globales/parametros-globales.repository';

@Injectable()
export class DashboardScheduler implements OnModuleInit {
  private readonly logger = new Logger(DashboardScheduler.name);

  constructor(
    private readonly parametrosRepo: ParametrosGlobalesRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const rutaSql = join(process.cwd(), 'scripts', 'smr_dashboard_refresh.sql');
      const ddl = await readFile(rutaSql, 'utf-8');
      await this.dataSource.query(ddl);
      this.logger.log('Funcion smr_dashboard_refresh registrada en la base de datos');
    } catch (error) {
      this.logger.error(`Error al registrar smr_dashboard_refresh: ${error.message}`);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async verificarParametroDashboard(): Promise<void> {
    const todos = await this.parametrosRepo.listarTodos();
    const param = todos.find(
      (p) => p.itemGrupo === 'DASHBOARD' && p.itemAtributo === 'REFRESH',
    );

    if (param) {
      this.logger.log(
        `[DASHBOARD][REFRESH] organizacion=${param.organizacionId} | valor=${param.valorRetornar}`,
      );

      try {
        const resultado = await this.dataSource.query(
          'SELECT smr_dashboard_refresh() AS resumen',
        );
        this.logger.log(`[DASHBOARD][REFRESH] ${resultado[0]?.resumen}`);
      } catch (error) {
        this.logger.error(
          `[DASHBOARD][REFRESH] Error al ejecutar procedimiento: ${error.message}`,
        );
      }
    }
  }
}
