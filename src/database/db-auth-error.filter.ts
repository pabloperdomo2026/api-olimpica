import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

const PG_INVALID_PASSWORD = '28P01';
const PG_INVALID_AUTHORIZATION = '28000';

@Catch(QueryFailedError)
export class DbAuthErrorFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const driverError = (exception as any).driverError;
    const code: string = driverError?.code;

    if (code === PG_INVALID_PASSWORD || code === PG_INVALID_AUTHORIZATION) {
      console.error(
        `[DbAuthErrorFilter] PostgreSQL auth error (${code}) — las credenciales rotaron. Reiniciando proceso...`,
      );
      process.exit(1);
    }

    const ctx = host.switchToHttp();
    ctx.getResponse().status(500).json({
      statusCode: 500,
      message: 'Database error',
    });
  }
}
