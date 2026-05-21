import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Public } from '../autenticacion/decoradores/public.decorator';

@Public()
@Controller({ version: '1', path: 'health' })
export class HealthController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async check() {
    try {
      await this.dataSource.query('SELECT 1');
    } catch {
      throw new ServiceUnavailableException('Database unavailable');
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
